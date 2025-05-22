import React from 'react';

const SuggestedPrompts = ({ prompts, onSelectPrompt }) => {
  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-sm font-medium text-gray-500">Suggested</h3>
      <div className="space-y-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            className="block w-full text-left text-sm bg-gray-100 hover:bg-gray-200 rounded-lg p-2.5 text-gray-700"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;