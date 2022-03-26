import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export function Home() {
  return (
    <>
      <h1>Company Website</h1>
      <nav>
        <Link to="about">About</Link>
        <Link to="events">events</Link>
        <Link to="contact">contact</Link>
      </nav>
    </>
  );
}
export function About() {
  return (
    <>
      <h1>About Page</h1>
      <Outlet />
    </>
  );
}

export function Services() {
  return (
    <>
      <h2>Our Services</h2>
    </>
  );
}

export function CompanyHistory() {
  return (
    <>
      <h2>Our CompanyHistory</h2>
    </>
  );
}
export function Location() {
  return (
    <>
      <h2>Our Location</h2>
    </>
  );
}

export function Events() {
  return <h1>Events Page</h1>;
}
export function Contact() {
  return <h1>Contact</h1>;
}

export function Whoops404() {
  let location = useLocation();
  return (
    <>
      <h1>Resource not found at {location.pathname}</h1>
    </>
  );
}
