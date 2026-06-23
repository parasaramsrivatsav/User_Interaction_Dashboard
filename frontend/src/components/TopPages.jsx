import { useEffect, useState } from "react";
import api from "../api";

function TopPages() {

  const [pages, setPages] = useState([]);

  useEffect(() => {

    api.get("/top-pages")
      .then(res => {
        setPages(res.data);
      });

  }, []);

  return (
    <div className="table-section">
      <h2>Top Pages</h2>

      {!pages.length ? (
        <p>No page analytics are available yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Page URL</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page._id}>
                <td>{page._id}</td>
                <td>{page.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TopPages;