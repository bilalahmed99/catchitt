import React, { useEffect, useRef, useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Tabs, Tab, Badge, Box, IconButton, Chip, CardMedia, Stack, Avatar } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
// import Image from "next/image";
import { defaultGreyBackground } from '../../icons';
import PersonIcon from '@mui/icons-material/Person';

function GamingLiveUI() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSwitchingStreams, setIsSwitchingStreams] = useState(false);

    const [mediaByCategory, setMediaByCategory] = useState({
        selectedCategory: 'all',
        items: [],
        page: 1,
      });
    
       const [postCategories, setPostCategories] = useState<any>(
          {
            items: [],
            isLoading: false,
          }
        );
      
      const scroll = (direction: 'left' | 'right') => {
        const { current } = scrollRef;
        if (current) {
          const scrollAmount = direction === 'left' ? -200 : 200;
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      };
const [recommendedLiveVideos, setRecommendedLiveVideos] = useState<any>(
    {
      items: [],
      isLoading: false,
    }
  );      

        useEffect(() => {
          loadPostCategories();
        }, []);
      
        let postsBySelectedCategory = recommendedLiveVideos.items;
      
        useEffect(() => {
          postsBySelectedCategory = mediaByCategory.selectedCategory == 'all' ? recommendedLiveVideos.items : recommendedLiveVideos.items.filter((item: any) => item.topic.topicName == mediaByCategory.selectedCategory);
        }, [mediaByCategory.selectedCategory]);
        
        const chipLabels = ['All', ...Array.from(new Set(recommendedLiveVideos.items.map((stream: any) => stream.topic.topicName)))];
      
  function loadPostCategories()
  {
    let endpoint = `${process.env.VITE_API_URL}/live-stream/v2/categories`;
    let requestOptions =
    {
      method: 'GET',
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    setPostCategories((prev: any) => ({ ...prev, isLoading: true }));

    fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((response) => setPostCategories((prev: any) => ({ ...prev, items: response.data, isLoading: false })))
    .catch((error) => console.error('Fetch error:', error));
  };

  const RecommendedCard = ({ stream }: { stream: any }) => (
      <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            image={stream.icon || defaultGreyBackground}
            alt={stream.name}
            sx={{ borderRadius: 2, maxHeight: 185, height: 185 }}
            onError={(event: any) => event.target.src != defaultGreyBackground && (event.target.src = defaultGreyBackground)}
          />
        </Box>
        <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
        <Stack direction="row" spacing={1} mt={0.5}>
          {/* <Avatar src={stream.userAvatar} sx={{ width: 24, height: 24 }} /> */}
          <Box>
              <Typography variant="body2" fontWeight={500} >
              {stream.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" >
              {stream.watching} watching
              </Typography>
          </Box>
          </Stack>
        </Box>
      </Box>
    );
     const LiveStreamCard = ({ stream, onClick }: { stream: any, onClick: (streamId: string) => void }) => (
        <Box sx={{ borderRadius: 2, width: "100%", position: 'relative', mr: 2, textAlign: 'left' }}>
          <Box sx={{ position: 'relative' }}  onClick={() => onClick(stream._id)}>
          <CardMedia
            component="img"
            image={stream.thumbnail || defaultGreyBackground} // fallback if null/undefined
            height="160"
            alt={stream.streamTitle}
            sx={{ borderRadius: 2, maxHeight: 260, height: 260 }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultGreyBackground; // fallback if broken URL
            }}
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
                {stream.consumers.length}
                </span>
            </Box>
          </Box>
          <Box sx={{ mt: 1, px: 0.5, pb: 1.5 }}>
          <Stack direction="row" spacing={1} mt={0.5}>
            <Avatar src={stream.owner.photo} sx={{ width: 24, height: 24 }} />
            <Box>
                <Typography variant="body2" fontWeight={500} noWrap>
                {stream.streamTitle}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                {stream.owner.name}
                </Typography>
            </Box>
            </Stack>
          </Box>
        </Box>
      );

  return (
    <div className="p-6">
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
                {postCategories.items.map((item: any) => (
                  <Chip
                    sx={{ border: 'none', borderRadius: '8px', backgroundColor: '#1618230F', fontSize: '14px' }}
                    key={item._id}
                    label={item.name}
                    clickable
                    variant="outlined"
                    onClick={() => {
                      setMediaByCategory({
                        selectedCategory: item.name.toLowerCase(),
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
      {/* recommended streams */}
          <Box  sx={{ mt: 4 }}>
              <Box display="flex" flexWrap="wrap" gap={3}>
                {postCategories.items.map((item: any) => (
                  <Box key={item._id} sx={{ width: 'calc((100% - 144px) / 7)' }}>
                    <RecommendedCard stream={item} />
                  </Box>
                ))}
              </Box>

          </Box>
         {/* live video */}

         <Box sx={{px: 2}}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
                        <Typography variant="h6" fontSize={'22px'} color={'#161823'} fontWeight={600}>
                        Recommended LIVE videos
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {recommendedLiveVideos.items.map((stream: any) => (
                            <Grid item xs={12} sm={6} key={stream.id}>
                                <LiveStreamCard 
                                  stream={stream} 
                                  onClick={(streamId: any) => {
                                    setIsSwitchingStreams(true);
  
                                    if (!socketRef.current || !isConnected) {
                                      console.log('Socket not connected, reconnecting...');
                                      startSocket();
                                      setIsSwitchingStreams(false);
                                      return;
                                    }
                                    // First leave the current room
                                    (socketRef.current as any).emit('leaveRoom', currentStream?._id || '651c880a8ac697cffc082dbf', (response: any) => {
                                      console.log('Left room response:', response);
                                    });

                                    let joinRoomInput: { liveStreamRoomId: string; accesstoken: string } = {
                                      liveStreamRoomId: streamId,
                                      accesstoken: token ?? '',
                                    };

                                    setCurrentStream(stream);
                                    (socketRef.current as any).emit('joinRoom', joinRoomInput, (response: any) => {
                                      console.log('Joined new room response:', response);
                                    });

                                    let joinLiveStreamRoom: { liveStreamRoomId: string; accessToken: string; name?: string; userName?: string; email?: string; userImage?: string } = {
                                      liveStreamRoomId: streamId,
                                      accessToken: token ?? '',
                                      name: profileData?.name,
                                      userName: profileData?.username, 
                                      email: profileData?.email,
                                      userImage: profileData?.avatar || profileData?.cover,
                                    };

                                    (socketRef.current as any).emit('joinLiveStreamRoom', joinLiveStreamRoom, (response: any) => {
                                      console.log('Joined live stream room response:', response);
                                    });
                                    setSelectedLiveVideo((prev: any) => ({ ...prev, details: stream }));
                                    // Navigate to the new stream page
                                    navigate(`/golive?streamId=${streamId}`);

                                    setIsSwitchingStreams(false);

                                  }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
    </div>
  );
}
export default GamingLiveUI;