import '../App.css';
import style from "../styles/card.module.css";
import React, { useState, useEffect, useReducer } from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Wrapper from '../components/Wrapper';
import ProfileForm from '../components/ProfileForm';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { homeReducer, initialState } from '../reducers/homeReducer';
import useHomepageAPI from '../hooks/homepageAPI';

const HomePage = () => {

  const { dispatch, state } = useHomepageAPI();

  const { profiles, page, count, title, searchTerm, titles } = state;

  const handleTitleChange = (event) => {
    dispatch({ type: "SET_TITLE", payload: event.target.value });
  };

  const handleSearchChange = (event) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
  };

  const handlePageChange = (newPage) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <Wrapper>
      <h1>Profile App</h1>
      <div className="filter-wrapper">
        <div className="filter-select">
          <label htmlFor="title-select">Select a title: </label>
          <select id="title-select" onChange={handleTitleChange}>
            <option value="">All</option>
            {titles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-search">
          <label htmlFor="search-name">Search by name: </label>
          <input
            type="text"
            id="search-name"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
        </div>
      </div>
      <div className={style["profile-cards"]}>
        {profiles.map(profile => (
          <Link to={`/profile/${profile.id}`} key={profile.id}>
            <Card key={profile.email} {...profile} />
          </Link>
        ))}
      </div>
      {
        count === 0 && <p>No Profiles found</p>
      }
      {count > 10 &&
        <div className="pagination">
          <button onClick={() => dispatch({type: "SET_PAGE", payload: page - 1})} disabled={page === 1}>
            Previous
          </button>
          <span>{page}/{Math.ceil(count / 10)}</span>
          <button onClick={() => dispatch({type: "SET_PAGE", payload: page + 1})} disabled={page >= Math.ceil(count / 10)}>
            Next
          </button>
        </div>
      }
    </Wrapper>
  );
};

export default HomePage;