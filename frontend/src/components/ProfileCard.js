import React, { useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({ user, userType, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    bio: user.bio || '',
    // Doctor specific fields
    specialization: user.specialization || '',
    experience: user.experience || '',
    education: user.education || '',
    availability: user.availability || [],
    // Patient specific fields
    age: user.age || '',
    gender: user.gender || '',
    bloodGroup: user.bloodGroup || '',
    allergies: user.allergies || '',
    medicalHistory: user.medicalHistory || ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };
  
  // Render doctor profile view
  const renderDoctorProfile = () => {
    return (
      <div className="profile-details">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            {user.phone && (
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{user.address}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Professional Information</h3>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Specialization:</span>
              <span className="info-value">{user.specialization}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Experience:</span>
              <span className="info-value">{user.experience} years</span>
            </div>
            {user.education && (
              <div className="info-item">
                <span className="info-label">Education:</span>
                <span className="info-value">{user.education}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Available on:</span>
              <span className="info-value">{user.availability?.join(', ') || 'Not specified'}</span>
            </div>
          </div>
        </div>
        
        {user.bio && (
          <div className="profile-section">
            <h3>About Me</h3>
            <p className="profile-bio">{user.bio}</p>
          </div>
        )}
      </div>
    );
  };
  
  // Render patient profile view
  const renderPatientProfile = () => {
    return (
      <div className="profile-details">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">{user.age}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">{user.gender}</span>
            </div>
            {user.phone && (
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{user.phone}</span>
              </div>
            )}
            {user.address && (
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{user.address}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Medical Information</h3>
          <div className="profile-info">
            {user.bloodGroup && (
              <div className="info-item">
                <span className="info-label">Blood Group:</span>
                <span className="info-value">{user.bloodGroup}</span>
              </div>
            )}
            {user.allergies && (
              <div className="info-item">
                <span className="info-label">Allergies:</span>
                <span className="info-value">{user.allergies}</span>
              </div>
            )}
            {user.medicalHistory && (
              <div className="info-item">
                <span className="info-label">Medical History:</span>
                <span className="info-value">{user.medicalHistory}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Render doctor profile edit form
  const renderDoctorEditForm = () => {
    return (
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">Experience (years)</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>About Me</h3>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-control"
              rows="4"
            ></textarea>
          </div>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-save">Save Changes</button>
          <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  };
  
  // Render patient profile edit form
  const renderPatientEditForm = () => {
    return (
      <form onSubmit={handleSubmit} className="profile-edit-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Medical Information</h3>
          <div className="form-group">
            <label htmlFor="bloodGroup">Blood Group</label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="allergies">Allergies</label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Penicillin, Peanuts, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="form-control"
              rows="4"
              placeholder="Any past medical conditions, surgeries, etc."
            ></textarea>
          </div>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-save">Save Changes</button>
          <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  };
  
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
        
        <div className="profile-title">
          <h2>{user.name}</h2>
          <p className="profile-subtitle">
            {userType === 'doctor' 
              ? `${user.specialization} • ${user.experience} years of experience` 
              : `${user.age} years old • ${user.gender}`
            }
          </p>
        </div>
        
        <button 
          className="edit-profile-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      <div className="profile-content">
        {isEditing ? (
          userType === 'doctor' ? renderDoctorEditForm() : renderPatientEditForm()
        ) : (
          userType === 'doctor' ? renderDoctorProfile() : renderPatientProfile()
        )}
      </div>
    </div>
  );
};

export default ProfileCard;