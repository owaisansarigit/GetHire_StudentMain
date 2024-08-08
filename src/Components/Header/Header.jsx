import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import InternshipModal from "../../Pages/Internship/InternshipModal";
import Logo from "../../assets/Images/Gethire SVG.svg";
import { Menu, MenuItem, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DropdownLink = styled(Link)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  border: "1px solid gray",
  borderRadius: "20px",
}));

const Header = () => {
  const navigate = useNavigate();
  const [showFullNavbar, setShowFullNavbar] = useState(false);
  const [showInternshipDropDown, setShowInternshipDropDown] = useState(false);
  const [selectInternshipOption, setSelectInternshipOption] =
    useState("location");

  const [internshipModal, setInternshipModal] = useState(false);

  const toggleInternshipModalOpen = () => {
    setInternshipModal(true);
  };
  const toggleInternshipModalClose = () => {
    setInternshipModal(false);
  };

  const toggleNavbar = () => {
    setShowFullNavbar(!showFullNavbar);
  };

  const toggleInternshipDropDown = () => {
    setShowInternshipDropDown(!showInternshipDropDown);
  };

  const handleSelectInternshipOption = (option) => {
    setSelectInternshipOption(option);
  };
  const internshipListItem = () => {
    switch (selectInternshipOption) {
      case "location":
        return [
          <div key="1" onClick={toggleInternshipModalOpen}>
            Work from Home
          </div>,
          <a key="2" href="/#">
            Internship in Bangalore
          </a>,
          <a key="3" href="/#">
            Internship in Delhi
          </a>,
          <a key="4" href="/#">
            Internship in Hyderabad
          </a>,
          <a key="5" href="/#">
            Internship in Mumbai
          </a>,
          <a key="6" href="/#">
            Internship in Chennai
          </a>,
          <a key="7" href="/#">
            Internship in Pune
          </a>,
          <a key="8" href="/#">
            Internship in Kolkata
          </a>,
          <a key="9" href="/#">
            Internship in Jaipur
          </a>,
          <a key="10" href="/#">
            International Internship
          </a>,
          <a key="11" href="/#">
            View all internships Internship
          </a>,
        ];
      case "profile":
        return [
          <a key="1" href="/#">
            Computer Science Internship
          </a>,
          <a key="2" href="/#">
            Marketing Internship
          </a>,
          <a key="3" href="/#">
            Finance Internship
          </a>,
          <a key="4" href="/#">
            Graphic Design Internship
          </a>,
          <a key="5" href="/#">
            Architecture Internship
          </a>,
          <a key="6" href="/#">
            Mechanical Internship
          </a>,
          <a key="7" href="/#">
            HR Internship
          </a>,
          <a key="8" href="/#">
            Digital Marketing Internship
          </a>,
          <a key="9" href="/#">
            Law Internship
          </a>,
          <a key="10" href="/#">
            Electronics Internship
          </a>,
          <a key="11" href="/#">
            Content Writing Internship
          </a>,
        ];
      case "categories":
        return [
          <a key="1" href="/#">
            Engineering Internship
          </a>,
          <a key="2" href="/#">
            Business/MBA Internship
          </a>,
          <a key="3" href="/#">
            Part-Time Jobs/Internships
          </a>,
          <a key="4" href="/#">
            Humanities Internship
          </a>,
          <a key="5" href="/#">
            Science Internship
          </a>,
          <a key="6" href="/#">
            Internships with Job Offer
          </a>,
          <a key="7" href="/#">
            Internships for Women
          </a>,
          <a key="8" href="/#">
            View all internships
          </a>,
        ];
      case "moreInternship":
        return [
          <a key="1" href="/#">
            Internships by Category
          </a>,
          <a key="2" href="/#">
            Internships by Location
          </a>,
        ];
      default:
        return [];
    }
  };

  // material

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("StudentToken");
    window.location.reload();
    navigate("/");
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-menu" : undefined;
  const open2 = Boolean(anchorEl2);
  const id2 = open ? "simple-menu" : undefined;

  return (
    <>
      <div className="bg-[#fff] h-[70px] w-full flex justify-start items-center p-[10px] pl-20">
        <div className="flex justify-center items-center text-[#2a5caa] mr-10">
          <img src={Logo} className="h-[2rem]" alt="" />
        </div>
        <div onClick={toggleNavbar} className="flex md:hidden">
          <FiAlignJustify size={"30px"} />
        </div>
        <div className=" hidden text-[18px] justify-center items-center font-[400] md:flex gap-[43px]  font-[Outfit]">
          <Link to="/">Home</Link>
          <div
            onClick={toggleInternshipDropDown}
            className="relative cursor-pointer"
          >
            Internship
          </div>
          {showInternshipDropDown && (
            <div className="bg-white  shadow-lg flex top-[100px] absolute w-[485px] h-[431px]">
              <div className="py-[22px] w-[223px] text-[16px] font-[400] pr-[10px]">
                <p
                  onClick={() => handleSelectInternshipOption("location")}
                  className={` ${
                    selectInternshipOption === "location"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px] cursor-pointer`}
                >
                  Top Location
                </p>
                <p
                  onClick={() => handleSelectInternshipOption("profile")}
                  className={` ${
                    selectInternshipOption === "profile"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px] cursor-pointer`}
                >
                  Profile
                </p>
                <p
                  onClick={() => handleSelectInternshipOption("categories")}
                  className={` ${
                    selectInternshipOption === "categories"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px] cursor-pointer`}
                >
                  Top Categories
                </p>
                <p
                  onClick={() => handleSelectInternshipOption("moreInternship")}
                  className={` ${
                    selectInternshipOption === "moreInternship"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px] cursor-pointer`}
                >
                  Explore More Internships
                </p>
              </div>
              <div className="border-[1px] border-[#ebe6e6] h-full w-px "></div>
              <div className="py-[36px] px-[18px] overflow-auto w-[262px]">
                <ul className="flex flex-col gap-[17px] text-[15px] cursor-pointer text-black text-opacity-[50%] font-[400]">
                  {internshipListItem().map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}

          <div className="relative">
            <Link
              onClick={(event) => setAnchorEl2(event.currentTarget)}
              sx={{ cursor: "pointer" }}
            >
              Jobs
            </Link>
            <div className="absolute top-2" style={{ left: "-5rem" }}>
              <Popover
                id={id}
                open={open2}
                anchorEl={anchorEl2}
                onClose={() => setAnchorEl2(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  The content of the Popover.
                </Typography>
                <Link to="/blank/Jobs">Jobs</Link>
              </Popover>
            </div>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <div className="border flex justify-center items-center border-blue-500 rounded-2xl text-sm py-1 px-2 font-semibold text-blue-500 cursor-pointer">
            AI Tools
          </div>
          <Link to="/blank/bookmarked">
            <img
              src="/images/iconoir_bookmark.svg"
              className="w-[24px] h-[24px]"
              alt=""
            />
          </Link>
          <Link to={"/chat"}>
            <img
              src="/images/tabler_message-2.svg"
              className="w-[24px] h-[24px]"
              alt=""
            />
          </Link>
          <Link to={"/notification"}>
            <i className="fa-regular fa-bell cursor-pointer"></i>
          </Link>
          <div>
            <DropdownLink onClick={handleClick}>
              <img
                src="/images/Ellipse2.svg"
                className="w-[26px] h-[26px] rounded-[50%]"
                alt="User Avatar"
              />
              <img
                src="/images/bxs_up-arrow.svg"
                className="w-[12px] h-[9px]"
                alt="Arrow"
              />
            </DropdownLink>
            <Menu
              id={id}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": id,
              }}
            >
              <MenuItem onClick={() => navigate("/blank/Portfolio")}>
                Portfolio
              </MenuItem>
              <MenuItem onClick={() => navigate("/SkillManager")}>
                My Skills
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div
          className={` ${
            !showFullNavbar ? "flex " : "hidden"
          } z-10 bg-white overflow-x-auto h-screen  right-0 w-[300px] pb-[120px] px-[53px] text-[18px] absolute flex-col font-[400] gap-[43px]  font-[Outfit]`}
        >
          <div className="flex flex-col gap-[13px]">
            <div className="flex gap-[9px] items-center text-[24px] font-[500] font-[Outfit]">
              <p>Hi, Chetan!</p>
              <img
                src="/images/PngItem_hi.svg"
                className="h-[22px] w-[23px]"
                alt=""
              />
            </div>
            <p className={`text-[18px] font-[400] font-[outfit]`}>
              Let’s help you land your dream career
            </p>
          </div>
          <Link>Home</Link>
          <div
            onClick={toggleInternshipDropDown}
            className="relative cursor-pointer"
          >
            Internship
          </div>
          {showInternshipDropDown && (
            <div className="bg-white shadow-lg flex flex-col top-[250px] absolute h-full">
              <div className="py-[22px] w-[223px] text-[16px] font-[400] pr-[10px]">
                <p
                  onClick={() => handleSelectInternshipOption("location")}
                  className={` ${
                    selectInternshipOption === "location"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px]`}
                >
                  Top Location
                </p>
                <p
                  onClick={() => handleSelectInternshipOption("profile")}
                  className={` ${
                    selectInternshipOption === "profile"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px]`}
                >
                  Profile
                </p>
                <p
                  onClick={() => handleSelectInternshipOption("categories")}
                  className={` ${
                    selectInternshipOption === "categories"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px]`}
                >
                  Top Categories
                </p>
                <p
                  onClick={() => handleSelectInternshipOption("moreInternship")}
                  className={` ${
                    selectInternshipOption === "moreInternship"
                      ? "bg-[#4234a2] bg-opacity-[10%] rounded-tr-[39px] rounded-br-[39px] w-full  flex items-center "
                      : ""
                  } px-[17px] py-[8px]`}
                >
                  Explore More Internships
                </p>
              </div>
              {/* <div className="border-[1px] border-[#ebe6e6] h-full w-px "></div> */}
              <div className="py-[36px] px-[18px] overflow-auto w-full">
                <ul className="flex flex-col gap-[17px] text-[15px] text-black text-opacity-[50%] font-[400]">
                  {internshipListItem().map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}
          <Link to="/Jobs">Jobs</Link>
          <Link to="/blank/clubs">Clubs</Link>
          <div className="flex gap-[8px] bg-[#e7f6ff] rounded-[8px] px-[14px] py-[12px]">
            <p className="text-[18px] font-[400] text-[#4234a2]">Switch Mode</p>
            <img
              src="/images/icon-park-outline_switch.svg"
              className="w-[24px] h-[24px]"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-[44px]">
            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                className="w-[24px] h-[24px]"
                src="/images/mingcute_to-do-line.svg"
                alt=""
              />
              <p>To do list (1)</p>
            </div>

            <div className="flex text-[20px] font-[400] font-[Outfit] w-full justify-between">
              <div className="flex gap-[10px] ">
                <div className="flex mt-[7px] justify-center items-center bg-gradient-to-r from-[#0F87B3] to-[#462DA1] w-[18px] h-[18px] rounded-[50%]">
                  <img className=" w-[12px] " src="/images/Vector.svg" alt="" />
                </div>
                <div>
                  <p>Skills missing</p>
                  <p className={`text-[14px] text-black text-opacity-[50%] `}>
                    Add Your Skills
                  </p>
                </div>
              </div>
              <img
                src="/images/VectorRightArrow.svg"
                className={`w-[5.5px] mt-[10px] h-[11px] `}
                alt=""
              />
            </div>

            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                className="w-[24px] h-[24px]"
                src="/images/bytesize_portfolio.svg"
                alt=""
              />
              <p>Portfolio</p>
            </div>
            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                className="w-[24px] h-[24px]"
                src="/images/carbon_notification.svg"
                alt=""
              />
              <p>Notification</p>
            </div>
            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                className="w-[24px] h-[24px]"
                src="/images/material-symbols-light_folder-managed.svg"
                alt=""
              />
              <p>Application Manager</p>
            </div>
            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                className="w-[24px] h-[24px]"
                src="/images/fluent-mdl2_add-work.svg"
                alt=""
              />
              <p>Job Counsellor</p>
            </div>

            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                className="w-[24px] h-[24px]"
                src="/images/healthicons_i-training-class.svg"
                alt=""
              />
              <p>Training</p>
            </div>
            <div className="flex items-center gap-[10px] text-[20px] font-[400] font-[Outfit]">
              <img
                src="/images/mdi_college-outline.svg"
                className="w-[24px] h-[24px]"
                alt=""
              />
              <p>College Board</p>
            </div>
          </div>
          <div className="flex gap-[43px]">
            <Link>
              <img
                src="/images/iconoir_bookmark.svg"
                className="w-[24px] h-[24px]"
                alt=""
              />
            </Link>
            <Link>
              <img
                src="/images/tabler_message-2.svg"
                className="w-[24px] h-[24px]"
                alt=""
              />
            </Link>
            <Link className="flex justify-center items-center gap-[6px]">
              <img
                src="/images/Ellipse2.svg"
                className="w-[26px] h-[26px] rounded-[50%]"
                alt=""
              />
              <img
                src="/images/bxs_up-arrow.svg"
                className="w-[12px] h-[9px]"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
      {internshipModal && (
        <InternshipModal
          onOpen={toggleInternshipModalOpen}
          onClose={toggleInternshipModalClose}
        />
      )}
    </>
  );
};

export default Header;
