from app import app, db, Item
from datetime import datetime, date

def seed_database():
    """Seed the database with sample data"""
    
    # Sample items
    sample_items = [
        {
            'title': 'iPhone 13 Pro',
            'description': 'Black iPhone 13 Pro with cracked screen protector. Has a blue case.',
            'category': 'Electronics',
            'status': 'lost',
            'location': 'Library - 2nd Floor',
            'date_lost_found': date(2024, 1, 15),
            'contact_name': 'John Doe',
            'contact_email': 'john.doe@strathmore.edu',
            'contact_phone': '+254712345678'
        },
        {
            'title': 'Red Backpack',
            'description': 'Red Jansport backpack with laptop compartment. Contains notebooks and pens.',
            'category': 'Accessories',
            'status': 'found',
            'location': 'Student Center',
            'date_lost_found': date(2024, 1, 14),
            'contact_name': 'Jane Smith',
            'contact_email': 'jane.smith@strathmore.edu',
            'contact_phone': '+254723456789'
        },
        {
            'title': 'Calculus Textbook',
            'description': 'Stewart Calculus 8th Edition. Name "Mike Johnson" written inside cover.',
            'category': 'Books',
            'status': 'found',
            'location': 'Mathematics Department',
            'date_lost_found': date(2024, 1, 13),
            'contact_name': 'Sarah Wilson',
            'contact_email': 'sarah.wilson@strathmore.edu',
            'contact_phone': '+254734567890'
        },
        {
            'title': 'Car Keys',
            'description': 'Toyota car keys with black leather keychain. Has house keys attached.',
            'category': 'Keys',
            'status': 'lost',
            'location': 'Parking Lot B',
            'date_lost_found': date(2024, 1, 12),
            'contact_name': 'David Brown',
            'contact_email': 'david.brown@strathmore.edu',
            'contact_phone': '+254745678901'
        },
        {
            'title': 'Blue Hoodie',
            'description': 'Navy blue hoodie, size M. Nike brand with white logo.',
            'category': 'Clothing',
            'status': 'found',
            'location': 'Gymnasium',
            'date_lost_found': date(2024, 1, 11),
            'contact_name': 'Lisa Davis',
            'contact_email': 'lisa.davis@strathmore.edu',
            'contact_phone': '+254756789012'
        },
        {
            'title': 'Student ID Card',
            'description': 'Strathmore University student ID for Alex Thompson, Student No: SU123456',
            'category': 'Documents',
            'status': 'found',
            'location': 'Cafeteria',
            'date_lost_found': date(2024, 1, 10),
            'contact_name': 'Security Office',
            'contact_email': 'security@strathmore.edu',
            'contact_phone': '+254767890123'
        }
    ]
    
    # Clear existing data
    Item.query.delete()
    
    # Add sample items
    for item_data in sample_items:
        item = Item(**item_data)
        db.session.add(item)
    
    # Commit changes
    db.session.commit()
    print(f"Added {len(sample_items)} sample items to the database!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_database()
