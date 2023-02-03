import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import useStyle from './ClientStyle';

const SearchStyle = () => {

    const classes = useStyle();

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: 8,
        backgroundColor: alpha(theme.palette.common.white, 0.80),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 1),
        },
        // marginRight: 20,
        // width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            width: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    return (
        <Search >
            <SearchIconWrapper>
                <SearchIcon 
                sx={{
                    color: 'secondary.main',
                }}
                />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Recherche.."
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>

    )
}

export default SearchStyle