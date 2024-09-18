import React from 'react'

const Card = ({ image, title, author, price, year, genres }) => {
    const genresList = genres.map((genre) => genre.Name).join(', ');
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg w-48 text-left">
      {/* <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" /> */}
      <div className="flex flex-col p-4">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <p className="text-sm text-gray-600">{author}</p>
        <p className="text-sm text-gray-600">{year}</p>
        <p className="text-xl text-gray-600 font-bold">Rp {price}</p>
        <p className="text-sm text-gray-600">{genresList}</p>
      </div>
    </div>
  )
}

export default Card
