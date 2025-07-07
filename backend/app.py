from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lost_found.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
CORS(app)

# Database Models
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)  # 'lost' or 'found'
    location = db.Column(db.String(200), nullable=False)
    date_reported = db.Column(db.DateTime, default=datetime.utcnow)
    date_lost_found = db.Column(db.Date, nullable=False)
    contact_name = db.Column(db.String(100), nullable=False)
    contact_email = db.Column(db.String(120), nullable=False)
    contact_phone = db.Column(db.String(20))
    image_filename = db.Column(db.String(200))
    is_resolved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'status': self.status,
            'location': self.location,
            'date_reported': self.date_reported.isoformat() if self.date_reported else None,
            'date_lost_found': self.date_lost_found.isoformat() if self.date_lost_found else None,
            'contact_name': self.contact_name,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'image_url': f'/api/uploads/{self.image_filename}' if self.image_filename else None,
            'is_resolved': self.is_resolved,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

# Helper functions
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_uploaded_file(file):
    if file and allowed_file(file.filename):
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)
        return unique_filename
    return None

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Strathmore Lost & Found API is running'})

@app.route('/api/items', methods=['GET'])
def get_items():
    try:
        # Query parameters
        status = request.args.get('status')  # 'lost' or 'found'
        category = request.args.get('category')
        search = request.args.get('search')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Build query
        query = Item.query.filter_by(is_resolved=False)
        
        if status:
            query = query.filter(Item.status == status)
        
        if category:
            query = query.filter(Item.category == category)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    Item.title.ilike(search_term),
                    Item.description.ilike(search_term),
                    Item.location.ilike(search_term)
                )
            )
        
        # Order by most recent
        query = query.order_by(Item.date_reported.desc())
        
        # Paginate
        items = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'items': [item.to_dict() for item in items.items],
            'total': items.total,
            'pages': items.pages,
            'current_page': page,
            'per_page': per_page
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    try:
        item = Item.query.get_or_404(item_id)
        return jsonify(item.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/items', methods=['POST'])
def create_item():
    try:
        # Handle file upload
        image_filename = None
        if 'image' in request.files:
            file = request.files['image']
            image_filename = save_uploaded_file(file)
        
        # Get form data
        data = request.form.to_dict()
        
        # Validate required fields
        required_fields = ['title', 'description', 'category', 'status', 'location', 
                          'date_lost_found', 'contact_name', 'contact_email']
        
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Parse date
        try:
            date_lost_found = datetime.strptime(data['date_lost_found'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Create new item
        item = Item(
            title=data['title'],
            description=data['description'],
            category=data['category'],
            status=data['status'],
            location=data['location'],
            date_lost_found=date_lost_found,
            contact_name=data['contact_name'],
            contact_email=data['contact_email'],
            contact_phone=data.get('contact_phone', ''),
            image_filename=image_filename
        )
        
        db.session.add(item)
        db.session.commit()
        
        return jsonify({
            'message': 'Item created successfully',
            'item': item.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    try:
        item = Item.query.get_or_404(item_id)
        
        # Handle file upload
        if 'image' in request.files:
            file = request.files['image']
            if file.filename:  # New file uploaded
                # Delete old file if exists
                if item.image_filename:
                    old_file_path = os.path.join(app.config['UPLOAD_FOLDER'], item.image_filename)
                    if os.path.exists(old_file_path):
                        os.remove(old_file_path)
                
                # Save new file
                item.image_filename = save_uploaded_file(file)
        
        # Update fields from form data
        data = request.form.to_dict()
        
        if 'title' in data:
            item.title = data['title']
        if 'description' in data:
            item.description = data['description']
        if 'category' in data:
            item.category = data['category']
        if 'status' in data:
            item.status = data['status']
        if 'location' in data:
            item.location = data['location']
        if 'date_lost_found' in data:
            item.date_lost_found = datetime.strptime(data['date_lost_found'], '%Y-%m-%d').date()
        if 'contact_name' in data:
            item.contact_name = data['contact_name']
        if 'contact_email' in data:
            item.contact_email = data['contact_email']
        if 'contact_phone' in data:
            item.contact_phone = data['contact_phone']
        if 'is_resolved' in data:
            item.is_resolved = data['is_resolved'].lower() == 'true'
        
        item.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Item updated successfully',
            'item': item.to_dict()
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        item = Item.query.get_or_404(item_id)
        
        # Delete associated image file
        if item.image_filename:
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], item.image_filename)
            if os.path.exists(file_path):
                os.remove(file_path)
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({'message': 'Item deleted successfully'})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/items/<int:item_id>/resolve', methods=['POST'])
def resolve_item(item_id):
    try:
        item = Item.query.get_or_404(item_id)
        item.is_resolved = True
        item.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Item marked as resolved',
            'item': item.to_dict()
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        total_items = Item.query.count()
        lost_items = Item.query.filter_by(status='lost', is_resolved=False).count()
        found_items = Item.query.filter_by(status='found', is_resolved=False).count()
        resolved_items = Item.query.filter_by(is_resolved=True).count()
        
        return jsonify({
            'total_items': total_items,
            'lost_items': lost_items,
            'found_items': found_items,
            'resolved_items': resolved_items,
            'success_rate': round((resolved_items / total_items * 100) if total_items > 0 else 0, 1)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify({
        'categories': [
            'Electronics',
            'Clothing',
            'Books',
            'Accessories',
            'Keys',
            'Documents',
            'Sports Equipment',
            'Other'
        ]
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
