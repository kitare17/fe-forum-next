"use client";
import React, { useEffect, useState,Suspense  } from 'react';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { toast } from 'react-toastify';
import { getAllSalePost, searchProduct, getAllCategory, getProductsByCategory } from '@/app/store/action/sale';
import ListSalePost from '@/app/pages/sale/compoment/ListSalePost';
import { Typography, AppBar, Toolbar, Container, Menu, MenuItem, Button, Box, CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { Storefront, Favorite, PostAdd, Category } from '@mui/icons-material';
import { Divider, Tooltip } from '@mui/material';

const Sale = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const title = searchParams.get('title');
  const initialCategory = searchParams.get('category._id') ?? '';

  const dispatch = useDispatch();
  const { allSalePosts, allPostsMaxPage, isLoading, isError, listCategory } = useSelector((state: RootState) => state.sale);

  const [currentCategory, setCurrentCategory] = useState<string>(initialCategory);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllCategory());

    if (title) {
      // @ts-ignore
      dispatch(searchProduct({ ten: title, page: page }));
    } else if (currentCategory) {
      // @ts-ignore
      dispatch(getProductsByCategory({ slugId: currentCategory, page: parseInt(page) }));
    } else {
      // @ts-ignore
      dispatch(getAllSalePost({ page: parseInt(page) }));
    }
  }, [page, title, currentCategory, dispatch]);

  useEffect(() => {
    if (isError) toast.error('An error occurred');
  }, [isError]);

  const handlePaging = (event: React.ChangeEvent<unknown>, value: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', value.toString());
    router.push(`/pages/sale?${searchParams.toString()}`);
  };

  const handleCategorySelect = (categorySlug: string) => {
    // @ts-ignore
    dispatch(getProductsByCategory({ slugId: categorySlug, page: parseInt(page) }));
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      // @ts-ignore
      dispatch(searchProduct({ ten: searchTerm, page: '1' }));
      setSearchTerm('');
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#FF9800' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo và tên trang web */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Storefront sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ color: 'white' }}>
              Chợ Trời
            </Typography>
          </Box>

         
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '20px' }}>
            <Tooltip title="Danh sách yêu thích">
              <Button
                component={Link}
                href="/pages/sale/wishlist"
                color="inherit"
                startIcon={<Favorite />}
                sx={{ mr: 1, color: 'white' }}
              >
                Yêu thích
              </Button>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', mx: 1 }} />

            <Tooltip title="Quản lý bài đăng">
              <Button
                component={Link}
                href="/pages/sale/managepost"
                color="inherit"
                startIcon={<PostAdd />}
                sx={{ mr: 1, color: 'white' }}
              >
                Quản lý
              </Button>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'white', mx: 1 }} />

            <Tooltip title="Danh mục sản phẩm">
              <Button
                aria-controls="category-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                startIcon={<Category />}
                sx={{ color: 'white' }}
              >
                Danh mục
              </Button>
            </Tooltip>
            <Menu
              id="category-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {listCategory && listCategory.map((category) => (
                <MenuItem key={category._id} onClick={() => handleCategorySelect(category._id || "undefined")}>
                  {category.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

           {/* Thanh tìm kiếm */}
           <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', mx: 2 }}>
            <form onSubmit={handleSearchSubmit} style={{ width: '40%' }}>
              <TextField
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm sản phẩm..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'black' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: 'black',
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                  },
                }}
                variant="outlined"
              />
            </form>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ my: 4 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ListSalePost
              array={allSalePosts}
              categories={listCategory || []}
              onCategorySelect={handleCategorySelect}
            />
            <Grid
              container
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Pagination
                onChange={handlePaging}
                count={allPostsMaxPage}
                page={parseInt(page)}
                siblingCount={1}
                size="large"
                showLastButton
                showFirstButton
              />
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};
const SalePageRender = () => {
  return (
      <>
      {/* You could have a loading skeleton as the `fallback` too*/}
      <Suspense>
          <Sale/>
      </Suspense>
      </>
  )
};

export default SalePageRender;