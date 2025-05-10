import { SideNavBar } from './goLiveSidebar';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Chip, Typography, Card, CardMedia, Stack, Avatar, Grid, CardContent, Button } from '@mui/material';
import LiveStreaming from './liveStream';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function GoLive() {
  const chipLabels = [
    'All',
    'Entertainment',
    'Beauty & Style',
    'Performance',
    'Sports & Outdoors',
    'Talent',
    'Nature',
    'Comedy',
    'Vlogs',
    'Tech',
    'Talent',
    'Nature',
    'Comedy',
    'Vlogs',
    'Tech',
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [mediaByCategory, setMediaByCategory] = useState({
    selectedCategory: 'all',
    items: [],
    page: 1,
  });

  const scroll = (direction: 'left' | 'right') => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  type LiveStream = {
    id: string;
    title: string;
    username: string;
    viewers: number;
    imageUrl: string;
    userAvatar: string;
  };
  
  const dummyData: LiveStream[] = [
    {
      id: '1',
      title: 'Watch now and interact with others in real time!',
      username: '🔥G u j  ج ﻟ آ r x S I M B 🔺🔥',
      viewers: 9,
      imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1533004581829-aab5b0d67147?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '2',
      title: 'lag ke',
      username: 'jia ( ͡° ͜ʖ ͡°)',
      viewers: 4,
      imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-fb-1492571002-e2c96d7a6823.jpg?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      title: 'Event ws 9.50k',
      username: 'ROOM TARKAM MAS R',
      viewers: 7,
      imageUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1611689283666-173278c4384eimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  const dummyData2: LiveStream[] = [
    {
      id: '1',
      title: 'Watch now and interact ',
      username: '🔥G u j  ج ﻟ آ r x S I M B 🔺🔥',
      viewers: 9,
      imageUrl: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1533004581829-aab5b0d67147?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '2',
      title: 'lag ke',
      username: 'jia ( ͡° ͜ʖ ͡°)',
      viewers: 4,
      imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-fb-1492571002-e2c96d7a6823.jpg?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      id: '3',
      title: 'Event ws 9.50k',
      username: 'ROOM TARKAM MAS R',
      viewers: 7,
      imageUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      userAvatar: 'https://images.unsplash.com/profile-1611689283666-173278c4384eimage?w=32&dpr=2&crop=faces&bg=%23fff&h=32&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];
  
  const LiveStreamCard = ({ stream }: { stream: LiveStream }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={stream.imageUrl}
          height="160"
          alt={stream.title}
          sx={{ borderRadius: 2, maxHeight: 260 }}
        />
        <Box sx={{ position: 'absolute', top: 8, left: 8, display: 'flex', alignItems: 'center', gap: 0 }}>
            <span   className='w-9 rounded-sm text-sm ml-3 text-center text-white ' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
                Live
            </span>
          
          <span
          className='px-2'
            style={{borderRadius: 'none', background: '#00000080', fontSize: '13px', color: 'white', height: 20, display: 'flex', alignItems: 'center' }}
          >
            <PersonIcon sx={{ fontSize: 14 }} />
            {stream.viewers}
            </span>
        </Box>
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        <Avatar src={stream.userAvatar} sx={{ width: 24, height: 24 }} />
        <Box>
            <Typography variant="body2" fontWeight={500} noWrap>
            {stream.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
            {stream.username}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );

  const RecomendedCard = ({ stream }: { stream: LiveStream }) => (
    <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          image={stream.imageUrl}
          alt={stream.title}
          sx={{ borderRadius: 2, maxHeight: 185, height: 185 }}
        />
      </Box>
      <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
      <Stack direction="row" spacing={1} mt={0.5}>
        <Avatar src={stream.userAvatar} sx={{ width: 24, height: 24 }} />
        <Box>
            <Typography variant="body2" fontWeight={500} >
            {stream.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" >
            {stream.username}
            </Typography>
        </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <div className='flex' style={{ background: '#000' }}>
      <SideNavBar />
      <div className='w-[calc(100%-16rem)] ml-auto bg-white py-3 px-10'>
        <div>
          <Box display="flex" alignItems="center" mb={3} gap={1}>
            <IconButton
              sx={{ backgroundColor: 'white', boxShadow: '0px 0px 9px 0px #e4e6eb' }}
              onClick={() => scroll('left')}
            >
              <ChevronLeft />
            </IconButton>
            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 1,
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {chipLabels.map((label, idx) => (
                <Chip
                  sx={{ border: 'none', borderRadius: '8px', backgroundColor: '#1618230F', fontSize: '14px' }}
                  key={idx}
                  label={label}
                  clickable
                  variant="outlined"
                  onClick={() => {
                    setMediaByCategory({
                      selectedCategory: label.toLowerCase(),
                      items: [],
                      page: 1,
                    });
                  }}
                />
              ))}
            </Box>
            <IconButton
              sx={{ backgroundColor: 'white', boxShadow: '0px 0px 9px 0px #e4e6eb' }}
              onClick={() => scroll('right')}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </div>
        <LiveStreaming />
        <hr className='my-4'/>
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                Gaming
                </Typography>
                <Typography fontWeight={400} variant="body2" color="#16182399" sx={{ cursor: 'pointer' }}>
                View all
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {dummyData.map((stream) => (
                    <Grid item xs={12} sm={6} md={4} key={stream.id}>
                        <LiveStreamCard stream={stream} />
                    </Grid>
                ))}
            </Grid>
        </Box>
        {/* recommended streams */}
        <Box  sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                Recommended categories
                </Typography>
                <Typography fontWeight={400} variant="body2" color="#16182399" sx={{ cursor: 'pointer' }}>
                View all
                </Typography>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={3}>
              {dummyData2.map((stream) => (
                <Box key={stream.id} sx={{ width: 'calc((100% - 144px) / 7)' }}>
                  <RecomendedCard stream={stream} />
                </Box>
              ))}
            </Box>

        </Box>

        <Box  sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                LIVE Events
                </Typography>
                <Typography fontWeight={400} variant="body2" color="#16182399" sx={{ cursor: 'pointer' }}>
                View all
                </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <Card sx={{ borderRadius: 3, boxShadow: 0, textAlign: 'left', background: '#16182308' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                      <span   className='w-16 rounded-sm text-xs py-0.5 text-center text-white ' style={{ background: 'linear-gradient(113.02deg, #FF1764 0%, #ED3495 94.15%)'}}>
                          Live Event
                      </span>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Welcome to my LIVE
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar
                          src="/path-to-avatar.jpg" // Replace with actual path
                          alt="Yakout"
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography variant="body1" fontWeight="bold">
                          YAKOUT
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          1.1M Followers
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarTodayIcon fontSize="small" color="action" />
                        <Typography variant="body2">Wednesday, Apr 30, 2025</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2">9:00 PM – 9:30 PM</Typography>
                      </Box>

                      <Box>
                        <Button variant="contained"  sx={{ borderRadius: 2, background: '#FE2C55', }}>
                          Register
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
        </Box>
      </div>
    </div>
  );
}

export default GoLive;
