import { TextField, InputAdornment, MenuItem, IconButton } from "@mui/material";
import { Search, Tune } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

const categories = [
    { value: "Mobiles", label: "Mobiles" },
    { value: "Computer", label: "Computer" },
];

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="w-full flex items-center justify-center my-6">
            <div className="flex items-center w-full max-w-5xl ">
                <Box
                    display="flex"
                    alignItems="center"
                    className="bg-white border-2-[#99A4B3] rounded-full shadow-md px-4 w-full"
                    sx={{ borderWidth: 1, }}
                >
                    <TextField
                        select
                        defaultValue="Mobiles"
                        variant="standard"
                        className="bg-transparent"
                        InputProps={{
                            disableUnderline: true,
                            classes: { root: "text-sm font-medium" },
                        }}
                        SelectProps={{
                            MenuProps: {
                                classes: {
                                    paper: "shadow-lg",
                                },
                            },
                        }}
                        sx={{
                            width: 100,
                            "& .MuiSelect-select": {
                                padding: 0,
                                marginLeft: "8px",
                                fontSize: "14px",
                            },
                        }}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <span className="mx-2 text-gray-300">|</span>

                    <TextField
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for?"
                        variant="standard"
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            classes: { root: "h-12 text-sm" },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch}>
                                        <Search />
                                    </IconButton>
                                    <IconButton>
                                        <Tune />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& input": {
                                paddingLeft: "8px",
                                fontSize: "14px",
                            },
                        }}
                    />
                </Box>
            </div>
        </div>
    );
};

export default SearchBar;
