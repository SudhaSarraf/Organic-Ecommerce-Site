import React from "react";
import { styled } from "styled-components";

const Footer=()=>{
    return(
        <FooterContainer className="main-footer">
            <div className="footer-middle">
            <div className="container">
                <div className="row">                  
                    {/* column 2 */}
                    <div className="col-md-3 col-sm-6">
                       <h4>Designed By</h4>
                       <ul className="list-unstyled">
                            <li>sudha sarraf</li> 
                        </ul> 
                    </div>

                     {/* column 1 */}
                     <div className="col-md-3 col-sm-6">
                       <h4>Contact Us</h4>
                       <ul className="list-unstyled">
                            <li>+977 9811296559</li>
                            <li>sudha@gmail.com</li>
                            <li>Shreepur-10, Birgunj, Nepal</li>
                            {/* <li>sudha sarraf</li> */}
                        </ul> 
                    </div>
                  
                    {/* column 4 */}
                    <div className="col-md-3 col-sm-6">
                       <h4>Follow us on</h4>
                       <ul className="list-unstyled">
                            <li><a href="https://www.facebook.com/">Facebook</a></li>
                            <li><a href="https://www.youtube.com/">Youtube</a></li>
                            <li><a href="https://www.instagram.com/">Instagram</a></li>
                            <li><a href="/">Twitter</a></li>
                        </ul> 
                    </div>

                      {/* column 3 */}
                      <div className="col-md-3 col-sm-6">
                       <h4>Guided By</h4>
                       <ul className="list-unstyled">
                            <li>Amrendra Chaurasia</li>         
                        </ul> 
                    </div>
                </div>
                {/* footer bottom */}
                <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} Agro App - All Rights Reserved
                    </p>
                </div>
            </div>
            </div>
            
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.footer`
.footer-middle{
    background: var(--mainDark);
    padding-top: 3rem;
    color: var(--mainWhite);
}

.footer-bottom{
    padding-top: 1rem;
    padding-bottom:0.5rem;
}

ul li a {
    color: var(--mainGray);
}

ul li a:hover{
    color: var(--mainLight);
}
`;