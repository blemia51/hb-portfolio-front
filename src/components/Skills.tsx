import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

interface SkillsProps {
  isAdmin: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isAdmin }) => {
  const { t } = useTranslation();

  const handleEdit = () => {
    // Handle edit logic here
    console.log('Edit Skills Section');
  }

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
        // border: 'lightgray, 1px, solid',
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
      {isAdmin && (
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
        <Typography variant="h6">{t('Frontend')}</Typography>
        <Typography variant="body2">
          ReactJS, Redux, React Native, Gatsby, Redux-Saga, MUI
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        <Typography variant="h6">{t('Backend')}</Typography>
        <Typography variant="body2">
          NodeJS, NestJS, Microservices, REST APIs, GraphQL, JWT, Auth0
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        <Typography variant="h6">{t('DevOps')}</Typography>
        <Typography variant="body2">Docker, GitLab</Typography>
        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        <Typography variant="h6">{t('Database')}</Typography>
        <Typography variant="body2">MySQL, Postgress</Typography>
        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        <Typography variant="h6">{t('Tools')}</Typography>
        <Typography variant="body2">Agile methodology, Git, Jira</Typography>
        <Divider sx={{ my: 2, backgroundColor: 'white' }} />

        <Typography variant="h6">{t('Languages')}</Typography>
        <Typography variant="body2">
          French: Native <br />
          English: C2 <br />
          German: C1
        </Typography>
      </Box>
    </Box>
  );
};

export default Skills;
