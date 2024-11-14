'use client';
import React, { useState } from 'react';
import styles from './page.module.scss';

type Teacher = {
  name: string;
  role: string;
  email: string;
  password: string;
  id: string;
};

export default function HomePage() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { name: 'Jason', role: 'Admin', email: 'abc@gmail.com', password: 'password123', id: '00001' }
  ]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentTeacher(null);
    setEditModalOpen(false);
  };

  const openViewModal = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setCurrentTeacher(null);
    setViewModalOpen(false);
  };
  

  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachers([...teachers, newTeacher]);
    closeAddModal();
  };

  const handleEditTeacher = (updatedTeacher: Teacher) => {
    setTeachers(teachers.map(teacher => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)));
    closeEditModal();
  };
  const handleDeleteTeacher = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmDelete) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };
  

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.userName}>John Doe</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li className={styles.active}>Manage Users</li>
            <li>Manage Students</li>
            <li>Achievement Records</li>
            <li>Profile</li>
          </ul>
        </nav>
        <button className={styles.logout}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.header}>
          <input type="text" className={styles.searchBar} placeholder="Search" />
          <button className={styles.addButton} onClick={openAddModal}>Add</button>
        </div>
        <div className={styles.header}>
  {/* Logo on the left */}
  <div className={styles.logo}>
    <img src="./logo.jpg" alt="Logo" className={styles.logoImage} />
  </div>

 
  {/* User Avatar on the right */}
  <div className={styles.userAvatar}>
    <img src="./user.png" alt="User Avatar" className={styles.avatarImage} />
  </div>

  
</div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.role}</td>
                <td>
                  <button className={styles.actionButton} onClick={() => openViewModal(teacher)}>👁️</button>
                  <button className={styles.actionButton} onClick={() => openEditModal(teacher)}>✏️</button>
                  <button className={styles.actionButton} onClick={() => handleDeleteTeacher(teacher.id)}
>
  🗑️
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals for Add, Edit, and View */}
        {isAddModalOpen && <TeacherForm title="Add Teacher" onClose={closeAddModal} onSubmit={handleAddTeacher} />}
        {isEditModalOpen && currentTeacher && (
          <TeacherForm
            title="Edit Teacher"
            onClose={closeEditModal}
            onSubmit={handleEditTeacher}
            teacher={currentTeacher}
          />
        )}
        {isViewModalOpen && currentTeacher && (
          <TeacherViewModal teacher={currentTeacher} onClose={closeViewModal} />
        )}
      </main>
    </div>
  );
}

function TeacherForm({ title, onClose, onSubmit, teacher }: { title: string, onClose: () => void, onSubmit: (teacher: Teacher) => void, teacher?: Teacher }) {
  const [formData, setFormData] = useState<Teacher>(teacher || { name: '', role: '', email: '', password: '', id: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email address" />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" />
        <input name="id" value={formData.id} onChange={handleChange} placeholder="ID" />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function TeacherViewModal({ teacher, onClose }: { teacher: Teacher, onClose: () => void }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>View Teacher</h2>
        <p>Name: {teacher.name}</p>
        <p>Role: {teacher.role}</p>
        <p>Email: {teacher.email}</p>
        <p>Password: ••••••••</p>
        <p>ID: {teacher.id}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
