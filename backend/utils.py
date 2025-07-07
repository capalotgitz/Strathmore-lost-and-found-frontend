import os
import uuid
from werkzeug.utils import secure_filename
from PIL import Image

def allowed_file(filename, allowed_extensions=None):
    """Check if file extension is allowed"""
    if allowed_extensions is None:
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def save_uploaded_file(file, upload_folder, max_size=(800, 600)):
    """Save uploaded file with unique name and resize if it's an image"""
    if file and allowed_file(file.filename):
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(upload_folder, unique_filename)
        
        # Save file
        file.save(file_path)
        
        # Resize image if it's too large
        try:
            with Image.open(file_path) as img:
                # Convert RGBA to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Resize if larger than max_size
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                img.save(file_path, optimize=True, quality=85)
        except Exception as e:
            # If image processing fails, keep original file
            print(f"Image processing failed: {e}")
        
        return unique_filename
    return None

def delete_file(filename, upload_folder):
    """Delete file from upload folder"""
    if filename:
        file_path = os.path.join(upload_folder, filename)
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                return True
            except Exception as e:
                print(f"Error deleting file: {e}")
                return False
    return False

def validate_item_data(data):
    """Validate item data"""
    required_fields = [
        'title', 'description', 'category', 'status', 
        'location', 'date_lost_found', 'contact_name', 'contact_email'
    ]
    
    errors = []
    
    for field in required_fields:
        if field not in data or not data[field]:
            errors.append(f'Missing required field: {field}')
    
    # Validate status
    if 'status' in data and data['status'] not in ['lost', 'found']:
        errors.append('Status must be either "lost" or "found"')
    
    # Validate email format (basic)
    if 'contact_email' in data and data['contact_email']:
        if '@' not in data['contact_email']:
            errors.append('Invalid email format')
    
    return errors

def format_response(data=None, message=None, error=None, status_code=200):
    """Format API response"""
    response = {}
    
    if data is not None:
        response['data'] = data
    
    if message:
        response['message'] = message
    
    if error:
        response['error'] = error
    
    response['success'] = error is None
    
    return response, status_code
