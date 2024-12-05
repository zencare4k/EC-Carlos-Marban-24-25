import React, { useState, useEffect } from 'react';

const MemberEditModal = ({ member, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name,
                role: member.role
            });
        }
    }, [member]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.role) tempErrors.role = "Role is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Member</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div>
                        <label>Role</label>
                        <input 
                            type="text" 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                        />
                        {errors.role && <span className="error">{errors.role}</span>}
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default MemberEditModal;