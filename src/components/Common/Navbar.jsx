import { useEffect, useState } from "react"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories as categoriesAPI } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  // ✅ Fetch categories from API
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categoriesAPI.CATEGORIES_API)
        setSubLinks(res.data.data) // IMPORTANT: data.data
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  return (
    <div
      className={`relative flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-full max-w-maxContent items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-0">
          <span className="text-richblack-5 font-semibold text-xl md:text-2xl tracking-tight">
            Think
          </span>
          <span className="text-yellow-25 font-semibold text-xl md:text-2xl tracking-tight">
            ora
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-haspopup="true"
                    className={`group relative inline-flex items-center gap-1 rounded-md px-4 py-3 text-sm font-medium transition cursor-pointer focus:outline-none ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <span>{link.title}</span>
                    <BsChevronDown />

                    {/* Dropdown */}
                    <div className="invisible pointer-events-none absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      {/* Arrow */}
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                      {/* Loading / Categories */}
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="inline-flex w-full items-center rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Categories Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`inline-flex items-center justify-center rounded-md px-4 py-3 text-center cursor-pointer ${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link
              to="/login"
              className="block rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-center text-richblack-100 hover:bg-richblack-700 cursor-pointer"
            >
              Log in
            </Link>
          )}
          {token === null && (
            <Link
              to="/signup"
              className="block rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-center text-richblack-100 hover:bg-richblack-700 cursor-pointer"
            >
              Sign up
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile menu */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="mr-4 md:hidden rounded-lg border border-richblack-700 bg-richblack-800 p-2 text-richblack-100 transition hover:bg-richblack-700"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-richblack-700 bg-richblack-900 md:hidden">
          <div className="mx-auto flex max-w-maxContent flex-col gap-y-4 px-4 py-4">
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex flex-col gap-y-2">
                    <button
                      type="button"
                      onClick={() => setIsCatalogOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between text-left text-richblack-25"
                    >
                      <span>{link.title}</span>
                      <BsChevronDown className={`${isCatalogOpen ? "rotate-180" : ""} transition-transform`} />
                    </button>
                    {isCatalogOpen && (
                      <div className="space-y-2 rounded-lg bg-richblack-800 p-3 text-richblack-100">
                        {loading ? (
                          <p>Loading...</p>
                        ) : subLinks.length ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="inline-flex w-full items-center rounded-lg px-3 py-2 text-richblack-25 hover:bg-richblack-700"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                          ))
                        ) : (
                          <p>No Categories Found</p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`inline-flex w-full items-center rounded-md px-4 py-3 text-richblack-25 ${matchRoute(link?.path) ? "text-yellow-25" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-y-3 border-t border-richblack-700 pt-4">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="flex items-center gap-x-2 text-richblack-25"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AiOutlineShoppingCart className="text-xl" />
                  Cart {totalItems > 0 && <span className="rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-richblack-900">{totalItems}</span>}
                </Link>
              )}
              {token === null && (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 text-left"
                >
                  Log in
                </Link>
              )}
              {token === null && (
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 text-left"
                >
                  Sign up
                </Link>
              )}
              {token !== null && (
                <div className="rounded-[8px] border border-richblack-700 bg-richblack-800 p-4">
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
