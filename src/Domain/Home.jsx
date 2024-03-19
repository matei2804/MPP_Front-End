import React from "react";
import { MovieData } from "./MovieData";
import './Home.css'
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function Home(){

    let history = useNavigate();

    function setID(id, title, genre, year_of_release, trailer_link, photo ) {
		localStorage.setItem("id", id);
		localStorage.setItem("Title", title);
		localStorage.setItem("Genre", genre);
        localStorage.setItem("Year of realease", year_of_release);
        localStorage.setItem("Trailer Link", trailer_link);
        localStorage.setItem("Photo", photo);
	}

    function deleted(id) {
		let index = MovieData
			.map(function (e) {
				return e.id;
			})
			.indexOf(id);

		MovieData.splice(index, 1);
		history("/");
	}

    return (
        <div>
            <h1>Movie List </h1>    
            <br/><br/><br/>
            <div>
                <table className="left-aligned-table">
                <tbody>
                    {MovieData.map((item) => {
						return (
							<tr>
								<Link to={`/movie/${item.id}`}> <td>{item.title}</td> </Link>
								<td>
									<Link to={`/update`}>
										<Button
											onClick={() =>
												setID(
													item.id,
													item.title,
                                                    item.genre,
                                                    item.year_of_release,
                                                    item.trailer_link,
                                                    item.photo
												)
											}
											variant="info"
										>
											Update
										</Button>
									</Link>
								</td>

								<td>
									<Button
										onClick={() =>
											deleted(item.id)
										}
										variant="danger">
										Delete
									</Button>
								</td>
							</tr>
						);
					})}

                </tbody>
                </table>
            </div>
            <br/>
            <Link to="/create">
                <button style={{ fontSize: '24px' }}>Create</button>
            </Link>
        </div>
      );

}

export {Home};
