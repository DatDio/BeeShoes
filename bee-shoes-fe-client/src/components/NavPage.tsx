import React from "react";
const NavPage = ({
  totalPages,
  page,
  setPage,
}: {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  const ArrayPage: any[] = [];
  for (let i = 1; i <= totalPages; i++) {
    ArrayPage.push(i);
  }
  return (
    <nav
      aria-label="Page navigation example"
      className="flex items-center justify-center mt-2"
    >
      <ul className="list-style-none flex ">
        {page === 1 ? (
          <li>
            <span className=" relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-300 transition-all duration-300 ">
              Previous
            </span>
          </li>
        ) : (
          <li
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <span className="cursor-pointer relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">
              Previous
            </span>
          </li>
        )}

        {ArrayPage.map((e, i) => {
          return (
            <li
              key={i}
              onClick={() => {
                setPage(e);
              }}
            >
              <span
                className={`cursor-pointer relative block rounded-full  px-3 py-1.5 text-sm  transition-all duration-300 hover:bg-neutral-100   ${
                  page === e
                    ? "text-black font-bold bg-neutral-100"
                    : "text-black font-thin"
                }`}
              >
                {e}
              </span>
            </li>
          );
        })}

        {totalPages === page ? (
          <li>
            <span className=" pointer-events-none relative block rounded-full bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 text-neutral-300 hover:bg-neutral-100 ">
              Next
            </span>
          </li>
        ) : (
          <li
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <span className=" relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 ">
              Next
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavPage;
