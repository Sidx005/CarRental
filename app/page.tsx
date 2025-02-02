"use client";
import CarsFilterOption from "@/Components/CarsFilterOption";
import CarsList from "@/Components/CarsList";
import Hero from "@/Components/Hero/Hero";
import Search from "@/Components/Hero/Search";
// import SearchFilter from "@/Components/Hero/SearchFilter";
import { getCarList } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {
  const[carsList,setCarsList]=useState<any>([]);
  const[carsOrgList,setCarsOrgList]=useState<any>([]);

  const getCarList_= async () => {
    try {
      const response:any= await getCarList(); // Replace with your API endpoint
      // const result = await response.json();
      setCarsList(response?.carLists);
      setCarsOrgList(response?.carLists);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch car list:", error);
    }
  };
const filterCarList=(brand:String)=>{
  if(brand==='All'){
    setCarsList(carsOrgList)
    // return;
  }else{
  const filteredList=carsOrgList.filter((item:any)=>(
    item.carBrand===brand
  ))
  setCarsList(filteredList)}

}
  useEffect(() => {
    getCarList_();
  }, []);
const orderCarList=(order:any)=>{
  const sortedData=[...carsOrgList].sort((a,b)=>
    order==-1?a.price-b.price:b.price-a.price);
  setCarsList(sortedData);
}
  return (
    <div className="p-5 sm:px-10 md:px-20">
      <Hero />
      <Search />
      <div className="w-full flex justify-between  gap-5 flex-col">
      {/* <SearchFilter /> */}
      <CarsFilterOption setBrand={(val:string)=>filterCarList(val)} orderCarList={orderCarList} carsList={carsOrgList}/>
      <CarsList carsList={carsList}/>
      </div>
    </div>
  );
}
