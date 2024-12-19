import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';

const EditProfile = () => {
    // const [formData, setFormData] = useState({
    //     username: 'JohnDoe',
    //     email: 'john.doe@example.com',
    //     password: 'password123',
    //     confirmPassword: 'password123'
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Add logic to handle form submission, e.g., API call to update user profile
    //     console.log('Form submitted', formData);
    // };

    return (
<Card>
    <CardContent>
        <h2 className='text-2xl font-bold text-black'>Edit Profile</h2>
    </CardContent>
</Card>

        // <div className="edit-profile">
        //     <h2>Edit Profile</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Username:</label>
        //             <input
        //                 type="text"
        //                 name="username"
        //                 value={formData.username}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div>
        //             <label>Email:</label>
        //             <input
        //                 type="email"
        //                 name="email"
        //                 value={formData.email}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div>
        //             <label>Password:</label>
        //             <input
        //                 type="password"
        //                 name="password"
        //                 value={formData.password}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div>
        //             <label>Confirm Password:</label>
        //             <input
        //                 type="password"
        //                 name="confirmPassword"
        //                 value={formData.confirmPassword}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <button type="submit">Save Changes</button>
        //     </form>
        // </div>
    );
};

export default EditProfile;