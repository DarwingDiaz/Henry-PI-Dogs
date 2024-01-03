import "./pagination.styles.css";

const Pagination = ({ dogsPerPage, allDogs, currentPage, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="naveg">
      <ul className="lista">
        {currentPage > 1 && (
          <li className="otro">
            <button onClick={() => pagination(currentPage - 1)}>
              Back
            </button>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li className="otro" key={number}>
            <button
              onClick={() => pagination(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          </li>
        ))}

        {currentPage < pageNumbers.length && (
          <li className="otro">
            <button onClick={() => pagination(currentPage + 1)}>Next</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;