import Layout from "../layout/Layout";
import OtherServiceSlide from "../components/service/OtherServiceSlide";
import './ServicePackage.css';
import { redirect, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import BreadcrumbService from "../components/breadcrumb/BreadcrumbService";
import ServiceNavigation from "../components/service/ServiceNavigation";
import {useSelector} from "react-redux";

const fetchData = async (packageName, pageSize, currentPage, sortedField = "", sortOrder, token = "") => {

    const URL = `https://pet-world-a2c2979cf3b7.herokuapp.com/api/package-details/search/${packageName}?size=${pageSize}&page=${currentPage}&sort=${sortedField}${
      sortOrder === "asc" ? ",asc" : ",desc"
    }`;
    // const URL = `http://localhost:8080/api/package-details/search/${packageName}?size=${pageSize}&page=${currentPage}&sort=${sortedField}${sortOrder === "asc" ? ",asc" : ",desc"}`;
    
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Chèn token vào header
    }

    const options = {
        method: 'GET',
        headers: headers,
    };

    const response = await fetch(URL, options);
    const data = await response.json();
     console.log({ data });
    const servicePackages = data.content;

    console.log({servicePackages});
    const totalPages = data.totalPages;
    return { servicePackages, totalPages };
};


export const ServicePackage = () => {
    const packageDefault = useParams()
    const [packageName, setPackageName] = useState(packageDefault);
    const [isSortedByPrice, setIsSortedByPrice] = useState(false);
    const [isSortedByCenterName, setIsSortedByCenterName] = useState(false);
    const [isSortedAsDesc, setSortedAsDesc] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 9;
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    // const [packageName, setPackageName] = useState("");

    const isLogin = useSelector((state) => state.auth.login?.currentUser);
    // const PACKAGE_URL = process.env.REACT_APP_FETCH_API + `/packages/${packageId}`;
    let token = "";
    if(isLogin){
        token = isLogin.token;
    }
    useEffect(() => {
        // const name = fetch(PACKAGE_URL);
        // setPackageName(name);
        let sortedField= '';
        let sortOrder = 'asc';
        if(isSortedAsDesc){
            sortOrder ="desc";
        }
        if(isSortedByPrice){
            sortedField = 'price';
        }
        if(isSortedByCenterName){
            sortedField = 'center';
        }
        const fetchPage = async () => {
            const { servicePackages, totalPages } = await fetchData(packageName.name, pageSize, currentPage, sortedField,sortOrder, token);
            setData(servicePackages);
            setTotalPages(totalPages);
            // setPackageName(servicePackages[0]?.packageName);
            // console.log({ servicePackages });
        };
        fetchPage();


    }, [currentPage, pageSize, isSortedByPrice, isSortedAsDesc]);

    const getCurrentPageHandler = (currentPage) => {
        setCurrentPage(currentPage)
    }
    const sortByPriceHandler = () => {
        setIsSortedByPrice(!isSortedByPrice);
        setIsSortedByCenterName(false);
    }
    const sortByCenterNameHandler = () => {
        setIsSortedByCenterName(!isSortedByCenterName)
        setIsSortedByPrice(false)
    }

    const sortAsDescHandler = () => {
        setSortedAsDesc(!isSortedAsDesc)
    }
// console.log({ packageDefault });
// console.log({ packageName });

    return (
      <Layout>
        <BreadcrumbService />
        <div className="service-package">
          <div className="service-package-wrapper">
            <div className="service-package-sidebar">
              <div className="service-package-check-box-item">
                <h5 className="service-package-widget-title">Order By</h5>
                <div className="service-package-checkbox-container">
                  <label className="service-package-checkbox-label">
                    Price
                    <input type="button" onClick={sortByPriceHandler} />
                    <span className="service-package-checkmark" />
                    {isSortedByPrice && (
                      <p className="service-package-checkmark--checked"></p>
                    )}
                  </label>
                  <label className="service-package-checkbox-label">
                    Center Name
                    <input type="checkbox" onClick={sortByCenterNameHandler} />
                    <span className="service-package-checkmark service-package-checkmark--hr" />
                    {isSortedByCenterName && (
                      <p className="service-package-checkmark--checked"></p>
                    )}
                  </label>
                  <label className="service-package-checkbox-label service-package-checkbox-label--space">
                    Asc
                    <input type="checkbox" onClick={sortAsDescHandler} />
                    <span className="service-package-checkmark" />
                    {!isSortedAsDesc && (
                      <p className="service-package-checkmark--checked"></p>
                    )}
                  </label>
                  <label className="service-package-checkbox-label">
                    Desc
                    <input type="checkbox" onClick={sortAsDescHandler} />
                    <span className="service-package-checkmark" />
                    {isSortedAsDesc && (
                      <p className="service-package-checkmark--checked"></p>
                    )}
                  </label>
                  <label className="service-package-checkbox-label">
                    Bones &amp; Rawhide
                    <input type="checkbox" />
                    <span className="service-package-checkmark" />
                    {<p className="service-package-checkmark--checked"></p>}
                  </label>
                </div>
              </div>
            </div>
            <div className="service-package-content">
              <OtherServiceSlide servicePackages={data} />
            </div>
          </div>
        </div>
        <ServiceNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          getCurrentPage={getCurrentPageHandler}
          setCurrentPage={setCurrentPage}
        />
      </Layout>
    );
}


export const sentRequest = async (url, method = 'GET', data = null, token = null) => {
    const CART_API = process.env.REACT_APP_FETCH_API;

    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`; // Chèn token vào header
        }

        if (data) {
            options.body = JSON.stringify(data);
            const responsePost = await fetch(`${CART_API}/${url}`, options);
            return redirect("/cart")
        }

        const response = await fetch(`${CART_API}/${url}`, options);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        // Handle error here
        console.error('Error:', error.message);
        // You can choose to throw an error or return a default value
        throw error;
    }
}

