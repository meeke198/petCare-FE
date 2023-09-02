import React, {useEffect, useRef, useState} from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {addItemByOne, decreaseItemByOne, deleteAllItems, deleteItem, firstCallApi} from "../store/cartInventorySlice";
import {sentRequest} from "./ServicePackage";
import BillingDetails from "../components/shop/BillingDetails";
import { GET, URL_CART } from "../utilities/constantVariable";
import { Toast } from 'primereact/toast';
import OrderSummary from "../components/shop/OrderSummary";


function CheckOutPage() {

  const toast = useRef(null);
  const [alteredAmount, setAlteredAmount] = useState(0);
  const  [total, setTotal] = useState(0);
console.log();
  useEffect(() => {
 
  }, [alteredAmount])
  return (
    <Layout>
      <Breadcrumb pageName="Check Out" pageTitle="Check Out" />
      <Toast ref={toast} />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <BillingDetails toast={toast} onGetTotal={total} />
            </div>
            <aside className="col-lg-5">
              <OrderSummary onSenTotal={setTotal} getTotal={total} />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CheckOutPage;
