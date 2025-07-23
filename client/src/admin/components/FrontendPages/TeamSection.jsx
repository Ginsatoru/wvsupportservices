import React, { useState, useEffect } from "react";
import { getTeamMembers, deleteTeamMember } from "../../../services/api";
import { Layout, Plus, Loader2 } from "lucide-react";
import ItemList from "./Layout/ItemList";
import AddSectionModal from "./Layout/AddSectionModal";
import EditModal from "./Layout/EditModal";

const CMSTeam = () => {
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
      setLoading(true);
      const response = await getTeamMembers();
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeamMember(id);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
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
    <div className="px-4 py-0 bg-gray-200 dark:bg-gray-900 rounded-xl">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Layout className="w-6 h-6 text-sky-400" />
                Team Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {teamMembers.length} team members
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-sky-600 dark:bg-sky-700 text-white text-sm font-medium rounded-xl hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-sky-500" />
              <p>Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 max-w-md mx-auto">
                <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No team members found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Add your first team member to get started
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-sky-600 dark:bg-sky-700 text-white text-sm font-medium rounded-xl hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors"
                >
                  Add Team Member
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <ItemList
                teamMembers={teamMembers}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>

        {/* Modals */}
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

export default CMSTeam;
