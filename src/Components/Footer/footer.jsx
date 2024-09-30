import './footer.css';
import  LanguageOutlined  from '@mui/icons-material/LanguageOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
export function Footer(){
    const AboutTomatoArr=["Who We Are","Blog","Work with us",
        "investor relations","Report fraud","press kit","contact us" ];
    const TomaverseArr=["Tomato","blinkit","feeding india","hyperpure",
        "tomato live","tomaland","weather union"  ];
    const forRestaurantArr=["partner with us","apps for you"];
    const learnMoreArr=["privacy","security","terms","sitemap"];
    return(
        <div id="footer-container">
            <div id="footer-title">
                <p id='footer-tomato-header'>Tomato</p>
                <div id="country-selec">
                <div id='country-selection-btn'>
                          <LanguageOutlined
                          sx={{

                        fontSize:{
                            xs:16 , sm:18,md:20,lg:22
                        },
                        margin:'auto 4px auto 0px'
                    }}    
                        />
                                        
                    <p>India</p></div>
                    <div id='language-selection-btn'>
                         <LanguageOutlined  sx={{
                        fontSize:{
                            xs:16 , sm:18,md:20,lg:22
                        },
                        margin:'auto 4px auto 0px'
                        }}   />
                    <p>English</p></div>
                      
                </div>
            </div>
            <div id='footer-main'>
                <div id='about-tomato-div'>
                    <p id='footer-contents-header'>About Tomato</p>
                    {
                        AboutTomatoArr.map((val,ind)=>{
                            return <div id='footer-main-contents' key={ind} >
                                <p  id='footer-arr-contents' > {val} </p>
                            </div>
                        })
                    }
                </div>
                <div id='tomaverse-div'>
                    <p id='footer-contents-header'>Tomaverse</p>
                    {
                        TomaverseArr.map((val,ind)=>{
                            return <div id='footer-main-contents' key={ind}>
                                <p  id='footer-arr-contents' > {val} </p>
                            </div>
                        })
                    }
                </div>
                <div id='for-restaurant-div'>
                    <p id='footer-contents-header'>For Restaurant</p>
                    {
                        forRestaurantArr.map((val,ind)=>{
                            return <div id='footer-main-contents' key={ind}>
                                <p  id='footer-arr-contents' > {val} </p>
                            </div>
                        })
                    }
                </div>
                <div id='learn-more-div'>
                    <p id='footer-contents-header'>Learn More</p>
                    {
                        learnMoreArr.map((val,ind)=>{
                            return <div id='footer-main-contents'  key={ind}>
                                <p id='footer-arr-contents' > {val} </p>
                            </div>
                        })
                    }
                </div>
                <div id='social-links-div'>
                    <p id='footer-contents-header'>social links</p>
                    <div id='social-icons-div'>
                        <InstagramIcon sx={{cursor:'pointer',
                        fontSize:{
                            xs:16 , sm:18,md:20,lg:22
                        }
                        }} 
                        
                        />
                        <XIcon sx={{cursor:'pointer',fontSize:{
                            xs:16 , sm:18,md:20,lg:22
                        }}}
                        
                        />
                        <YouTubeIcon sx={{cursor:'pointer',fontSize:{
                            xs:16 , sm:18,md:20,lg:22
                        }}}
                        
                        />
                        <FacebookIcon sx={{cursor:'pointer',fontSize:{
                            xs:16 , sm:18,md:20,lg:22
                        }}}
                        
                        />
                    </div>
                    <div>
                        <div id='ios-icon-div'>
                            <div id='ios-icon'>
                                <span>
                                <AppleIcon  />
                                </span>
                            </div>
                            <div id='ios-download-text' >
                                <p style={{fontSize:'8px'}}>Download on the </p>
                                <p>App Store </p>
                            </div>
                        </div>
                        <div id='android-icon-div'>
                            <div>
                                <span>
                                <PlayArrowIcon />
                                </span>
                            </div>
                            <div id='android-download-text' >
                                <p style={{fontSize:'8px'}} >Get it on </p>
                                <p>Google Play </p>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            <hr id='hr' />
            <p id='footer-text'>
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, 
            Privacy Policy and Content Policies. All trademarks are properties of their 
            respective owners. 2008-2024 © Zomato™ Ltd. All rights reserved
            </p>
            
        </div>
    )
}