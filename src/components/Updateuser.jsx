import React, { useEffect,useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function Updateuser() {

  let [firstname, setFirstname] = useState()
  let [lastname, setLastname] = useState()
  let [email, setEmail] = useState()
  let [contact, setContact] = useState()
  let [adddress1, setAdddress1] = useState()
  let [address2, setAddress2] = useState()
  let [country, setCountry] = useState()
  let [state, setState] = useState()
  let [city, setCity] = useState()
  let [pincode, setPincode] = useState()   

  let {id} = useParams();

  let history = useHistory();

  useEffect(()=>{
    fetch(`http://localhost:5000/user/${id}`)
    .then((response)=>{return response.json()})
    .then((data)=>{
      setFirstname(data.firstname)
      setLastname(data.lastname)
      setEmail(data.email) 
      setContact(data.contact)
      setAdddress1(data.adddress1)
      setAddress2(data.address2)
      setCountry(data.country) 
      setState(data.state)
      setCity(data.city)
      setPincode(data.pincode)                                 
    })
  },[])

  let handleSubmit = (e)=>{
    e.preventDefault();

    let details = {
      firstname,lastname,email,contact,adddress1,address2,country,state,city,pincode
    }

    fetch(`http://localhost:5000/user/${id}`,
    {
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-Type" : "application/json" },
      body:JSON.stringify(details)
    })
    .then(()=>{history.push("/users")})
    alert("users details updated succesfully")
  }

  let handleDelete = (id) =>{
    fetch(`http://localhost:5000/user/${id}`,
    {
      method:"Delete"
    })
    .then(()=>{history.push("/users")})
    alert("succesfully deleted user")
  }

  return (
    <div className='updateuser'>
      <div className="navbar">
                <div className="logo">
                    <span>IntelWorks</span>
                </div>
                <div className="nav-links">
                    <Link to="/adduser">Add User</Link>
                    <Link to="/">Home</Link>
                </div>
            </div>
            <div className="user-info">
        <div className="header">
          <h2 align="center">Add User Details</h2>
        </div>
        <form onSubmit={handleSubmit}>

        <div className="user-info-main">
          
        <div className="user-firstname">
        <label > First Name : </label>
        <input type="text" name="firstname" id="firstname" placeholder='Enter First Name...' value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}  />
        </div>
        
       <div className="user-lastname">
       <label >Last Name : </label>
        <input type="text" name="lastname" id="lastname" placeholder='Enter Last Name...' value={lastname} onChange={ (e)=>{setLastname(e.target.value)} }  />
       </div>

        <div className="user-email">
        <label >Email Id :</label>
        <input type="email" name="email" id="user-email" placeholder='Enter Your Email Id...' value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
        </div>

        <div className="user-contact">
        
        <PhoneInput
          className='user-contact'
          placeholder="Enter phone number"
          value={contact}
          onChange={setContact}
          />
        </div>

      <div className="user-address1">
      <label >Address 1 : </label>
      <input type="text" name="address" id="user-address" placeholder='Enter your Address...' value={adddress1} onChange={(e)=>{setAdddress1(e.target.value)}} />
      </div>

      <div className="user-address2">
      <label >Address 2 : </label>
      <input type="text" name="address2" id="user-address" placeholder='Enter Alternate Adress...' value={address2} onChange={(e)=>{setAddress2(e.target.value)}} />      </div>

      <div className="user-country-code">
        <input type="text" name="country" id="user-country" placeholder='Enter Your Country...' value={country} onChange={(e)=>{setCountry(e.target.value)}}/><br />
        <input type="text" name="state" id="user-state" placeholder='Enter your state...' value={state} onChange={(e)=>{setState(e.target.value)}}  /><br />
        <input type="text" name="city" id="user-city" placeholder='Enter Your City...' value={city} onChange={(e)=>{setCity(e.target.value)}}  /><br />
      </div>

      <div className="user-pincode">
      <label >pincode : </label>
      <input type="text" name="pincode" id="user-pincode"  placeholder='Enter Pincode...'value={pincode} onChange={(e)=>{setPincode(e.target.value)}}/>
      </div>
        </div>

      <div className="user-submit">
      <button>Submit</button>
      </div>

      </form>
      <button onClick={()=>{handleDelete(id)}} className="user-delete">Delete</button>
      </div>
       <div className="footer">
                <div className="footer-logo">
                    <span>IntelWorks.com</span>
                </div>
                <div className="footer-info">
                    <div className="footer-details">
                        <p>© 2020 IntelWorks Private Limited. All Rights Reserved. All Content in this webport is for the using stakeholder of IntelWorks Only.</p>
                        <span>Powered By <b>Sri Vatsa C S</b></span>
                    </div>
                    <div className="footer-images">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAitJREFUSEvtVkFy2kAQ7BYHyydjQ6q8KlcFvyDkBSEvMH5B8AuCX2DygiQvCHmBlRcE/yB+gX1wsYdAASfLVZHGtYASCQmtCFXxId4bUtM90zM7I+KJDp9IF8/C/8z5ra2e3NxUI9d9T6AlQAvALYC+EwSf94+PpyaTidYNBME0/m2epYQNibjuJYPgNAlaZ4MhjIDvABo5mHkAINsiMqsrZYL6fVLCo+GwTfKSpH9weHhq832k9YDAm0KcyLVDtn8BjRdKDWJsSnisdQ/AxdKKAcPwfP/o6Ece8U+tW84i2+JDTiFCJwxbSa6U8BqyXrJescp4OOyC/GjTBTBbFc3U2DwYay0ZskXUvpB+5f7+ytQ/6Y5F/ENNKeNk6mS6eqR1h8CXEpmY5slrqtW/2oXn9jnOS4o0l1ejhH4xRICzulL9woxLN8wG4Thh+DqvQTP3OHJdY+HeBtxF0FlNqWoeYJsaW2OjyLcDz2uXEjagyd1dUxynJ+SJlb0AEAFvk0MjCc2d1abJSJ5s02ACXK2OSavwcgabifXXtV7XVLH42u1k7I4qFTNbNxcXOa953qeiMhWuxfnK29npgGwCeFey3l9rSnVsWLvw7u4FRLo2ouX7UqKpWW2yg+u+CsmqmVwkF9NLJPcergQyE6CbN6HWBZzZTgR61h37h20Gkb7z8NAr8+FQtqs7JvPIOBAve5FrIacEbkXEr3ueX7IEGdjW31zPwmUd+P+sfgQQ3OEf6UvyOAAAAABJRU5ErkJggg==" />
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAlpJREFUSEvFlltu2kAUhv8zICVvATmVMlGkhhWUrKBkBSUrKDuouoKSFVRZQekKSleQZgVlBwYJeR4aCrwZKfaphhhqbI9n7BfmdS7f+edcCUdadCQuKoP/KNUjojNi7mqjmWjSYF61pXyqIsIJvJzPu3Gj8QlEfTC3CgFEKzCPRRQ9tK+uJjYjSsFL32/Fp6dfAQxsD2X2RyIMP7c7nZXpnhGcqPwB4LoidHd8KqLozqS+ELyFNpuPxm91tYRoJV5ebovgOXDyvb8dlc60X6H9mywGegS8T9k2FWF4k/32HHih1AjAR6so5gex2QyzDy6UGgL4krn/3ZPyIE4OwIlftdrSxcDTuZS9okMGMATQaUs53d05ALuqZea788vLcRqs87sJcPyaAUVZcKA6C9a+OrMpFlF0kw6Yv0EwZqIPpfeIVt7FRTunWFssgEcbVO97UmYNZpd7MXD7Rspf+uz+gecg6BORzlvrqgtOu2gPNgVFkRV1wQDuPSl11P9XXAYui+KsYRZ/58HPSg0I+FaksAp4EQQTEL0rfCeVDfuvLguuSmCljIGWzgbXdNKJryvadnlS3qcVJW7aAbc+LFhrT8p9S61VQGoGl7mALJW6jgHflk91wKUlUwNdqlANcHmT0OCkLerR5a1JeUXwTIRh19oWt/DXGUuXtsK6XQG8FlHUcxoEdioTuO5AOeWO4JmIon6l0WcP9/0Wn5yMsp3HBibmn7TZDGoNe2n/JtGu87Ovv98AXgMYC2CYbvimOHGaqw+MmM+72e/TbnGZpdPvVAbbctx1/2jgf+EzNi6SISEMAAAAAElFTkSuQmCC" />
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAgJJREFUSEvtll9OwkAQxr9peahPQqqJS0jEG+AJ0BtwAzmCnkA9gR5BTyCeQDyBcAI0MeyDEODNRLtjdmnr1hat2MgL+9Kku51v5jd/toQVLVqRLtbC/0Z+jTqBeiJlPQCaBNTNBtHUYb6tCPH415xkop4MBmXleRcA2lkCBHQpCE4qtVpvWQdSwpPn54Yqle7AXP7B6JMvxJzEEishbCLd2BjYosR8y0RRZFroCMx9R6n2dxGPpGwTsKuA+20hul99SwiPpbwyhudr5gTBwVfjmgje3h4re3vT7wIdSdkloAng3BfibKFwmNdJdEABh1me5qWaW3g0HLaI6MYYZu771WrDFnmR8qAEcKbw62tfE4jwhmd0YdZ1ITJgUNvYY9RjKTWO0/CjFJ6xlNmic4OGjhXlIjCx3UKFx8PhJRMZUgTo5yaAJwaivr/aEkLX0eftlEBN1PN3dvZtt0Mi9qvj0HAcsb2ZO8e/KS7T6677EAn5QqTmQW5hbSTRTno8vr8fptpJyrrSRcgcFd+1L0RqwlnYY7w2kfQA8TydD50bs4iow8w9PaeNGFHLGjAzB2gsM7uzR6br6vKPxReU6IyZ21vVaidvby+MONoI831pTbGEbQbu3SA4LvSSsBW0A4HnteJrkXnqKNX9i2CcwmUwFfHN+tenCIq5bKxR58JUxKEPQ3T1H7Q4+tcAAAAASUVORK5CYII=" />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Updateuser