from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Item(db.Model):
    __tablename__ = 'items'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, index=True)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False, index=True)
    status = db.Column(db.String(20), nullable=False, index=True)  # 'lost' or 'found'
    location = db.Column(db.String(200), nullable=False)
    date_reported = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    date_lost_found = db.Column(db.Date, nullable=False)
    contact_name = db.Column(db.String(100), nullable=False)
    contact_email = db.Column(db.String(120), nullable=False)
    contact_phone = db.Column(db.String(20))
    image_filename = db.Column(db.String(200))
    is_resolved = db.Column(db.Boolean, default=False, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Item {self.title}>'
    
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
    
    @classmethod
    def search(cls, query_string):
        """Search items by title, description, or location"""
        search_term = f"%{query_string}%"
        return cls.query.filter(
            db.or_(
                cls.title.ilike(search_term),
                cls.description.ilike(search_term),
                cls.location.ilike(search_term)
            )
        )
    
    @classmethod
    def get_by_status(cls, status):
        """Get items by status (lost/found)"""
        return cls.query.filter_by(status=status, is_resolved=False)
    
    @classmethod
    def get_by_category(cls, category):
        """Get items by category"""
        return cls.query.filter_by(category=category, is_resolved=False)
    
    @classmethod
    def get_recent(cls, limit=10):
        """Get most recently reported items"""
        return cls.query.filter_by(is_resolved=False).order_by(cls.date_reported.desc()).limit(limit)

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'phone': self.phone,
            'is_admin': self.is_admin,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
