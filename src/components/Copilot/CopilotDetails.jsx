import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ClipboardCheck, Plus, Route, Users } from 'lucide-react';

const CopilotDetails = ({ assignee = "Brian Byrne", team = "Unassigned" }) => {
  const [expandedSections, setExpandedSections] = useState({
    links: true,
    userData: false,
    conversationAttributes: false,
    companyDetails: false,
    salesforce: false,
    stripe: false,
    jiraTickets: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="flex flex-col h-full px-2">

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Assignee</span>
            <div className="flex items-center">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mr-2">
                {assignee.charAt(0)}
              </span>
              <span className="text-sm font-medium">{assignee}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Team</span>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-black" />
              <span className="text-sm font-medium">{team}</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('links')}
          >
            <span className="text-xs font-bold text-gray-500">LINKS</span>
            {expandedSections.links ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.links && (
            <div className="mt-3 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-5 h-5 mr-2 text-black flex items-center justify-center"><Route /></span>
                  <span className="text-sm">Tracker ticket</span>
                </div>
                <Plus size={24} className="text-black cursor-pointer bg-gray-200 rounded-full p-1" />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-5 h-5 mr-2 text-black flex items-center justify-center"><ClipboardCheck /></span>
                  <span className="text-sm">Back-office tickets</span>
                </div>
                <Plus size={24} className="text-black cursor-pointer bg-gray-200 rounded-full p-1" />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-5 h-5 mr-2 text-black flex items-center justify-center">↗</span>
                  <span className="text-sm">Side conversations</span>
                </div>
                <Plus size={24} className="text-black cursor-pointer bg-gray-200 rounded-full p-1" />
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('userData')}
          >
            <span className="text-xs font-bold text-gray-500">USER DATA</span>
            {expandedSections.userData ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.userData && (
            <div className="mt-3">
              <div className="text-sm text-gray-500">No user data available</div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('conversationAttributes')}
          >
            <span className="text-xs font-bold text-gray-500">CONVERSATION ATTRIBUTES</span>
            {expandedSections.conversationAttributes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.conversationAttributes && (
            <div className="mt-3">
              <div className="text-sm text-gray-500">No attributes configured</div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('companyDetails')}
          >
            <span className="text-xs font-bold text-gray-500">COMPANY DETAILS</span>
            {expandedSections.companyDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.companyDetails && (
            <div className="mt-3">
              <div className="text-sm text-gray-500">No company details available</div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('salesforce')}
          >
            <span className="text-xs font-bold text-gray-500">SALESFORCE</span>
            {expandedSections.salesforce ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.salesforce && (
            <div className="mt-3">
              <div className="text-sm text-gray-500">Not connected</div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('stripe')}
          >
            <span className="text-xs font-bold text-gray-500">STRIPE</span>
            {expandedSections.stripe ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.stripe && (
            <div className="mt-3">
              <div className="text-sm text-gray-500">Not connected</div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-b border-gray-200">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('jiraTickets')}
          >
            <span className="text-xs font-bold text-gray-500">JIRA FOR TICKETS</span>
            {expandedSections.jiraTickets ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {expandedSections.jiraTickets && (
            <div className="mt-3">
              <div className="text-sm text-gray-500">Not connected</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CopilotDetails;