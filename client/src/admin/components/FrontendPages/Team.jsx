import React, { useState, useEffect } from 'react';
import { getTeamMembers, deleteTeamMember } from '../../../services/api';
import ItemList from './ItemList';
import AddSectionModal from './AddSectionModal';
import EditModal from './EditModal';

const CMSPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await getTeamMembers();
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchTeamMembers();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    fetchTeamMembers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Member
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading team members...</div>
        ) : (
          <ItemList 
            teamMembers={teamMembers} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}

        <AddSectionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddSuccess}
        />

        {currentMember && (
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            member={currentMember}
            onSuccess={handleEditSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default CMSPage;