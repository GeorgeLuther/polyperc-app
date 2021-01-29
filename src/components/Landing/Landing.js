import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <section className="blurb">
            <h2>FIND YOUR GROOVE</h2>
            <p>Polyperc is a space for creating and transforming rhythmic patterns. Get your ideas out faster than ever before!</p>
            <Link to='/workspace' id="start">Let's Jam!</Link>
        </section>
        
    )
}
