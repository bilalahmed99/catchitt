import {
    Avatar,
    Box,
    Card,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Checkbox,
    Divider

  } from "@mui/material";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import EditIcon from "@mui/icons-material/Edit";
  import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import PublicIcon from "@mui/icons-material/Public";
  import UploadSidebar from "../UploadSidebar";
  import { useEffect, useState, useRef } from 'react';
  import Header from "../header/Header";
  import { head } from "lodash";
  import { PlayArrow, Check, ExpandMore, FavoriteBorder, FilterList, Search } from '@mui/icons-material';
  import { API_KEY } from '../../../utils/constants';
  import { formatCustomDate } from '../../../utils/helpers';
  import ReactPaginate from 'react-paginate';

  
  const posts1 = [
    {
      thumbnail: "thumbnail_url_1", // replace with real URL
      title: "Quran pak with Urdu translation... #ahsanadventure #muslimcontent",
      date: "Apr 23, 5:04 PM",
      duration: "00:17",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
    {
      thumbnail: "thumbnail_url_2",
      title: "Rishtay Bewafa Hotay Hain... Emotional Reminder",
      date: "Apr 22, 11:35 AM",
      duration: "00:57",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
    {
      thumbnail: "thumbnail_url_3",
      title: "videoplayback",
      date: "Feb 24, 11:40 AM",
      duration: "00:49",
      privacy: "Everyone",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ];
  
  export default function PostsAnalytics() {
    const [darkTheme, setdarkTheme] = useState<any>('');
    const abortController = useRef<AbortController | null>(null);
    
    const [anchorElView, setAnchorElView] = useState(null);
    const [anchorElComment, setAnchorElComment] = useState(null);
    const [anchorElLike, setAnchorElLike] = useState(null);
    const [anchorElPrivacy, setAnchorElPrivacy] = useState(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    
      

    const filterOptionsALLComments = {
        all: 'All comments', not_replied: 'Not replied', replied: 'Replied',
    };

    const filterOptionsPostedBy = {
        all: 'Posted by all', followers: 'Posted by followers', 'non-followers': 'Posted by non-followers',
    };

    const [selectedViewsCounts, setSelectedViewsCounts] = useState<string[]>([]);
    const [selectedCommentCounts, setSelectedCommentCounts] = useState<string[]>([]);
    const [selectedLikeCounts, setSelectedLikeCounts] = useState<string[]>([]);
    const [selectedPrivacyCounts, setSelectedPrivacyCounts] = useState<string[]>([]);
    const [posts, setPosts] = useState<any>({ items: [], page: 1, pageSize: 10, totalItems: 0, isLoading: true });
    
    

    // Options
    const followerOptions = ['<5K', '5K-10K', '10K-100K', '>100Klikes'];
    const viewsOptions = ['<1K', '1K-10K', '10K-100K', '>100K'];
    const likesOptions = ['<1K', '1K-10K', '10K-100K', '>100K'];
    const commentsOptions = ['<1K', '1K-10K', '10K-100K', '>100K'];
    const privacyOptions = ['Everyone', 'Only me', 'Friends'];


    const handleViewSelect = (option: string) => {
      if (selectedViewsCounts.includes(option)) {
        setSelectedViewsCounts(selectedViewsCounts.filter((item) => item !== option));
      } else {
        setSelectedViewsCounts([...selectedViewsCounts, option]);
      }
    };

    const handleViewsClear = () => {
      setSelectedViewsCounts([]);
    };
    
    const handleViewsApply = () => {
      handleViewsClose();
    };

    const handleViewsClose = () => {
      setAnchorElView(null);
    };

    const handleViewsClick = (event: any) => {
      setAnchorElView(event.currentTarget);
    };

    const handleCommentClick = (event: any) => {
      setAnchorElComment(event.currentTarget);
    };

    const handleCommentSelect = (option: string) => {
      if (selectedCommentCounts.includes(option)) {
        setSelectedCommentCounts(selectedCommentCounts.filter((item) => item !== option));
      } else {
        setSelectedCommentCounts([...selectedCommentCounts, option]);
      }
    };

    const handleCommentClear = () => {
      setSelectedCommentCounts([]);
    };
    
    const handleCommentApply = () => {
      handleCommentClose();
    };

    const handleCommentClose = () => {
      setAnchorElComment(null);
    };
    

    const handleLikeClick = (event: any) => {
      setAnchorElLike(event.currentTarget);
    };

    const handleLikeSelect = (option: string) => {
      if (selectedLikeCounts.includes(option)) {
        setSelectedLikeCounts(selectedLikeCounts.filter((item) => item !== option));
      } else {
        setSelectedLikeCounts([...selectedLikeCounts, option]);
      }
    };

    const handleLikeClear = () => {
      setSelectedLikeCounts([]);
    };
    
    const handleLikeApply = () => {
      handleLikeClose();
    };

    const handleLikeClose = () => {
      setAnchorElLike(null);
    };

    const handlePrivacyClick = (event: any) => {
      setAnchorElPrivacy(event.currentTarget);
    };

    const handlePrivacySelect = (option: string) => {
      if (selectedPrivacyCounts.includes(option)) {
        setSelectedPrivacyCounts(selectedPrivacyCounts.filter((item) => item !== option));
      } else {
        setSelectedPrivacyCounts([...selectedPrivacyCounts, option]);
      }
    };

    const handlePrivacyClear = () => {
      setSelectedPrivacyCounts([]);
    };
    
    const handlePrivacyApply = () => {
      handlePrivacyClose();
    };

    const handlePrivacyClose = () => {
      setAnchorElPrivacy(null);
    };

    const fetchPosts = async () => {
        try {
          const controller = new AbortController();
          abortController.current = controller;
          const response = await fetch(
            `${API_KEY}/profile/v2/${userId}/videos?page=${posts.page}&pageSize=${posts.pageSize}`,
            {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            })
            .then((res) => res.json())
            .then((data) => {
              console.log('posts data... v2')
              console.log(data.data.data)
              setPosts((prev: any) => ({
                ...prev,
                items: [...data.data.data],
                totalItems: data.data.total,
                isLoading:false
              }));
            })
            .catch((err) => {
              console.log(err)
            })
        } catch (error) {
          console.log(error)
        } finally {
          abortController.current = null;
        }
      }
    
      useEffect(() => {
        fetchPosts();
        return () => {
          if (abortController.current) {
            abortController.current.abort();
          }
        }
      }, [posts.page]);
    
    
    
    return (
      <>
      <Header />
     
    
      <div className={`mt-24 flex flex-col ${darkTheme}`}>
        <UploadSidebar />
        <div className='w-[calc(100%-14rem)] ml-auto p-4'>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mb={3} gap={2}>
        <Box display="flex" gap={1.5} flexWrap="wrap">

         {/* Views filter */}
         <Button
            onClick={handleViewsClick}
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            sx={{
              backgroundColor: 'white',
              color: '#000',
              border: '1px solid #e4e6eb',
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Views
          </Button>
    
          <Menu
            anchorEl={anchorElView}
            open={Boolean(anchorElView)}
            onClose={handleViewsClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {viewsOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleViewSelect(option)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedViewsCounts.includes(option)}
                  onChange={() => handleViewSelect(option)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewsClear}
                sx={{
                  borderColor: '#ccc',
                  color: '#000',
                  textTransform: 'none',
                  px: 2,
                  borderRadius: '8px',
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleViewsApply}
                sx={{
                  backgroundColor: '#ff2c55',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#e6003f',
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Menu>

          {/* Like filter */}
         <Button
            onClick={handleLikeClick}
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            sx={{
              backgroundColor: 'white',
              color: '#000',
              border: '1px solid #e4e6eb',
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Likes
          </Button>
    
          <Menu
            anchorEl={anchorElLike}
            open={Boolean(anchorElLike)}
            onClose={handleLikeClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {likesOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleLikeSelect(option)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedLikeCounts.includes(option)}
                  onChange={() => handleLikeSelect(option)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleLikeClear}
                sx={{
                  borderColor: '#ccc',
                  color: '#000',
                  textTransform: 'none',
                  px: 2,
                  borderRadius: '8px',
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleLikeApply}
                sx={{
                  backgroundColor: '#ff2c55',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#e6003f',
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Menu>

           {/* Privacy filter */}
         <Button
            onClick={handlePrivacyClick}
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            sx={{
              backgroundColor: 'white',
              color: '#000',
              border: '1px solid #e4e6eb',
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            Privacy
          </Button>
    
          <Menu
            anchorEl={anchorElPrivacy}
            open={Boolean(anchorElPrivacy)}
            onClose={handlePrivacyClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {privacyOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handlePrivacySelect(option)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedPrivacyCounts.includes(option)}
                  onChange={() => handlePrivacySelect(option)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handlePrivacyClear}
                sx={{
                  borderColor: '#ccc',
                  color: '#000',
                  textTransform: 'none',
                  px: 2,
                  borderRadius: '8px',
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handlePrivacyApply}
                sx={{
                  backgroundColor: '#ff2c55',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#e6003f',
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Menu>

            {/* Comments filter */}
         <Button
            onClick={handleCommentClick}
            startIcon={<FilterList />}
            endIcon={<ExpandMore />}
            sx={{
              backgroundColor: 'white',
              color: '#000',
              border: '1px solid #e4e6eb',
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            All comments
          </Button>
    
          <Menu
            anchorEl={anchorElComment}
            open={Boolean(anchorElComment)}
            onClose={handleCommentClose}
            PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 200 } }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >                
            {commentsOptions.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleCommentSelect(option)}
                sx={{ justifyContent: 'flex-start', gap: 1 }}
              >
                <Checkbox
                  checked={selectedCommentCounts.includes(option)}
                  onChange={() => handleCommentSelect(option)}
                  size="small"
                  sx={{
                    padding: '1px',
                    color: '#ff2c55',
                    '&.Mui-checked': {
                      color: '#ff2c55',
                    },
                  }}
                />
                {option}
              </MenuItem>
            ))}
    
            <Divider />
    
            <Box display="flex" justifyContent="space-between" p={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCommentClear}
                sx={{
                  borderColor: '#ccc',
                  color: '#000',
                  textTransform: 'none',
                  px: 2,
                  borderRadius: '8px',
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleCommentApply}
                sx={{
                  backgroundColor: '#ff2c55',
                  color: '#fff',
                  textTransform: 'none',
                  px: 3,
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#e6003f',
                  },
                }}
              >
                Apply
              </Button>
            </Box>
          </Menu>


          
        
        </Box>
      </Box>
          <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Posts (Created on)</TableCell>
                    <TableCell>Privacy</TableCell>
                    <TableCell align="center">Views</TableCell>
                    <TableCell align="center">Likes</TableCell>
                    <TableCell align="center">Comments</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
    
                <TableBody>
                {posts.items.map((post, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index === 0 ? "#f5f5f5" : "inherit",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box position="relative" mr={2}>
                            <Avatar
                              variant="rounded"
                              src={post.thumbnailUrl}
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                bgcolor: "rgba(0,0,0,0.7)",
                                color: "#fff",
                                fontSize: "10px",
                                px: 0.5,
                                borderRadius: "2px",
                              }}
                            >
                              {/* {post.duration} */}
                            </Box>
                          </Box>
    
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              noWrap
                              width={200}
                            >
                              {post?.category?.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatCustomDate(post?.createdTime)}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
    
                      {/* Privacy Dropdown */}
                      <TableCell>
                        <Select
                          size="small"
                          value={post?.privacyOptions.canView}
                          IconComponent={PublicIcon}
                          sx={{
                            backgroundColor: "#f1f3f4",
                            fontSize: "12px",
                            height: "32px"
                          }}
                        >
                          <MenuItem value="everyone">Everyone</MenuItem>
                          <MenuItem value="friends">Friends</MenuItem>
                          <MenuItem value="only_me">Only Me</MenuItem>
                          <MenuItem value="followers">Followers</MenuItem>
                        </Select>
                      </TableCell>
    
                      {/* Views */}
                      <TableCell align="center">{post.views}</TableCell>
    
                      {/* Likes */}
                      <TableCell align="center">{post?.likes && post?.likes.length}</TableCell>
    
                      {/* Comments */}
                      <TableCell align="center">{post?.commentsCount}</TableCell>
    
                      {/* Actions */}
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" gap={1}>
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="Change Thumbnail">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <InsertPhotoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="View Comments">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <ChatBubbleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="More Options">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* {posts1.map((post, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index === 0 ? "#f5f5f5" : "inherit",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box position="relative" mr={2}>
                            <Avatar
                              variant="rounded"
                              src={post.thumbnail}
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                bgcolor: "rgba(0,0,0,0.7)",
                                color: "#fff",
                                fontSize: "10px",
                                px: 0.5,
                                borderRadius: "2px",
                              }}
                            >
                              {post.duration}
                            </Box>
                          </Box>
    
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              noWrap
                              width={200}
                            >
                              {post.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {post.date}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
    
                      <TableCell>
                        <Select
                          size="small"
                          value={post.privacy}
                          IconComponent={PublicIcon}
                          sx={{
                            backgroundColor: "#f1f3f4",
                            fontSize: "12px",
                            height: "32px",
                            ".MuiSelect-select": {
                              pl: 4,
                            },
                          }}
                        >
                          <MenuItem value="Everyone">Everyone</MenuItem>
                          <MenuItem value="Only Me">Only Me</MenuItem>
                        </Select>
                      </TableCell>
    
                      <TableCell align="center">{post.views}</TableCell>
    
                      <TableCell align="center">{post.likes}</TableCell>
    
                      <TableCell align="center">{post.comments}</TableCell>
    
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" gap={1}>
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="Change Thumbnail">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <InsertPhotoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="View Comments">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <ChatBubbleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
    
                          <Tooltip title="More Options">
                            <IconButton size="small" sx={{ bgcolor: "#fafafa" }}>
                              <MoreHorizIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>

            <div className='py-4'>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(posts.totalItems / posts.pageSize)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={(data) => {
                          setPosts((prev: any) => ({ ...prev, page: data.selected + 1, isLoading: true }))
                        }}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                    
          </Card>
        </div>
      </div>
    </>
    );
  }
  