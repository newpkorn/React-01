import Transaction from './components/Transaction';
import FormComponent from './components/formComponent';
import './App.css'
import { useState, useEffect } from 'react';
import DataContext from './data/DataContect';
import ReportComponent from './components/reportCompnent'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {

  const design = {color:'blue', textAlign:'center', fontSize:'1.5rem'}

  const initData = [
    {id: 1, title: "Accommodation", amount:-8000},
    {id: 2, title: "Trasportaion", amount:-3000},
    {id: 3, title: "Salary", amount:35000}
  ]

  // create new state
  const [ reportIncome, setReportIncome ] = useState(0)
  const [ reportExpense, setReportExpense] = useState(0)
  const [ items, setItems ] = useState( initData )

  const onAddNewItem = ( newItem ) => {
    setItems( (prevItem) => {
      return [ newItem, ...prevItem ]
    })
  }

  useEffect( () => {
    const amounts = items.map( items => items.amount)
    
    const income = amounts.filter( element => element > 0 )
      .reduce( ( sum, element ) => sum += element, 0 ) // หาค่ารวมในอาร์เรย์ income โดย ตัวแรก sum คือตัวที่จะหาผลรวม, ตัวที่สองคือ element ที่จะเข้าไปดึงค่าในอาเรย์ออกมา และ 0 คือค่าเริ่มต้น
    
    const expense = (amounts.filter( element => element < 0 )
      .reduce( ( sum, element ) => sum += element, 0)) * -1 // เอาผลรวมที่ได้ทั้งหมดไป *-1 เพื่อให้ค่า sum ที่แสดงออกมาไม่ติดลบ
 
    setReportIncome(income.toFixed(2)) // .toFixed(2) คือกำหนดให้มีจุดทศนิยม 2 ตำแหน่ง
    setReportExpense(expense.toFixed(2))
  }, [ items, reportIncome, reportExpense ] ) // ถ้ามีค่าเปลี่ยนแปลงตรงไหน ก็ให้มาทำงานใน useEffect 

  return (
    <DataContext.Provider value={
      {
        income  : reportIncome,
        expense : reportExpense
      }
    }>
    <div className='container'>
      <h1 style={design}>แอพบัญชีรายรับ -  รายจ่าย</h1>
      <Router>
      <div>
        <ul className='horizontal-menu'>
          <li>
            <Link to="/" ecact>ข้อมูลบัญชี</Link>
          </li>
          <li>
            <Link to="/insert">บันทึกข้อมูล</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<ReportComponent />} />
          <Route path="/insert" element={
            <>
            <FormComponent onAddItem={onAddNewItem} />
            <Transaction items={items} />
            </>
          } />
        </Routes>
      </div>
    </Router>
    </div>
    </DataContext.Provider>
  );
}

export default App;
