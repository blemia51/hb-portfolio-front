import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useGetSkillsByUserIdQuery } from '../api/skillApi';
import { useGetLanguagesByUserIdQuery } from '../api/languageApi';
import SkillForm from './SkillForm';

interface SkillsProps {
  isLoggedIn: boolean;
  userId: number;
}

interface Skill {
  id: number;
  name: string;
  category?: {
    id: number;
    name: string;
  }
}

const Skills: React.FC<SkillsProps> = ({ isLoggedIn, userId }) => {
  const { t } = useTranslation();

  const { data: skills = [], error, isLoading } = useGetSkillsByUserIdQuery(userId);
  const { data: languages = [] } = useGetLanguagesByUserIdQuery(userId)
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading skills</p>;

  const groupByCategory = (skills: Skill[]) => {
    return skills.reduce((acc, skill) => {
      const categoryName = `${skill.category?.name}`
      if (!acc[categoryName]) {
        acc[categoryName] = {
          skill: [] 
        }
      }
      acc[categoryName].skill.push(skill);
      return acc
    }, {} as { [categoryName: string]: {skill: Skill[]}} )
  }

  const groupedSkills = groupByCategory(skills)
  
  console.log('skills', groupedSkills )

  const handleEdit = () => {
    setIsModalOpen(true);
  }

  // Function to handle modal close
  const handleClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <Box
      sx={{
        backgroundColor: '#3c4043',
        padding: 4,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
      }}
    >
      {/* Title in the Top-Left Corner */}
      <Typography
        variant="h4"
        color="white"
        sx={{
          position: 'absolute',
          top: 8,
          left: 16,
        }}
      >
        {t('skills')}
      </Typography>
      
      <Divider
        sx={{
          marginTop: '30px',
          width: '110%',
          backgroundColor: 'white',
          alignSelf: 'center',
        }}
      />
      {isLoggedIn && (
        <IconButton
          onClick={handleEdit}
          sx={{
            position: 'absolute',
            top: 8,
            right: 16,
            color: 'white',
            backgroundColor: '#282c34'
          }}
        >
          <EditIcon />
        </IconButton>
      )}
      {/* Section Content */}
      <Box sx={{ mt: 4, color: 'white', textAlign: 'left', width: '90%' }}>
        {Object.entries(groupedSkills).map(([category, { skill }]) => (
          <Box key={category}>
            <Typography variant="h6">{category}</Typography>
            <Typography variant="body2">
            {skill.map(s => s.name).join(', ')}
            </Typography>
            <Divider sx={{ my: 2, backgroundColor: 'white' }} />
          </Box>
        ))}
        <Typography variant="h6">{t('Languages')}</Typography>
          {languages.map((language) => (
            <Typography variant="body2" key={language.id}>
                {`${language.name} : ${language.proficiency}`}
            </Typography>
          ))}
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <SkillForm skills={groupedSkills} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Skills;
