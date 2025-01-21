import React from 'react'
import Image from 'next/image'

const Blog = () => {
  return (
    <>
    <section className='min-h-full w-full flex flex-col   items-center'>
            {/* banner */}
       <div className='h-full md:h-[316px] w-[90%] md:w-[1440px] flex flex-col  items-center justify-center'>
       <div className=' md:h-[316px] relative w-[90%] md:w-[1440px] '>
      <Image src={'/images/shopbenner.png'} alt='hero' width={1440} height={316} />
      <div className='w-[150px] md:w-[124px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] h-[90%] flex flex-col justify-center items-center md:h-[84px] '>
        <h1 className='font-medium text-4xl text-black'>Blog</h1>
        <p className='font-normal text-[16px] text-mygray'>home&gt;Blog</p>
        </div>
      </div>
      </div>
      {/* blog */}
      <div className= 'h-full md:h-[2710px] w-[90%] flex flex-col  items-center justify-between space-y-4 py-12 md:w-[1440px]  '> 
        <div className='h-[3800px] md:h-[2610px] w-[90%] md:w-[1210px] flex flex-col md:flex-row justify-between '>
        <div className='h-[2100px] md:h-[2490px]  flex flex-col justify-between md:w-[800px] '>
            <div className='h-[500px] md:h-[794px] w-full flex flex-col justify-between '>
                <div className='h-[220px] md:h-[500px] w-full '>

                <Image className='' src={'/images/filter/blogimg1.png'} alt='hero' width={817} height={500}  />
                <Image className='pt-2' src={'/images/filter/blogtag1.png'} alt='hero' width={349} height={24}  />
                </div>
               
                <div className='h-[200px] w-full  flex flex-col justify-between '>
                    <h2 className='text-[30px] font-medium text-myblack '>Going all-in with millennial design</h2>
                    <p className='text-[16px] font-normal text-mygray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
                     <button className=' w-[89px] h-[36px] border-b-2 border-myblack text-[16px] font-semibold text-myblack'>Read More</button>
                </div>
            </div>
            <div className='h-[500px] md:h-[794px] w-full flex flex-col justify-between '>
                <div className='h-[220px] md:h-[500px] w-full '>

                <Image className='' src={'/images/filter/blogimg2.png'} alt='hero' width={817} height={500}  />
                <Image className='pt-2' src={'/images/filter/blogtag2.png'} alt='hero' width={349} height={24}  />
                </div>
               
                <div className='h-[200px] w-full  flex flex-col justify-between'>
                    <h2 className='text-[30px] font-medium text-myblack '>Going all-in with millennial design</h2>
                    <p className='text-[16px] font-normal text-mygray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
                     <button className=' w-[89px] h-[36px] border-b-2 border-myblack text-[16px] font-semibold text-myblack'>Read More</button>
                </div>
            </div>
            <div className='h-[500px] md:h-[794px] w-full flex flex-col justify-between '>
                <div className='h-[220px] md:h-[500px] w-full '>

                <Image className='' src={'/images/filter/blogimg3.png'} alt='hero' width={817} height={500}  />
                <Image className='pt-2' src={'/images/filter/blogtag1.png'} alt='hero' width={349} height={24}  />
                </div>
               
                <div className='h-[200px] w-full  flex flex-col justify-between '>
                    <h2 className='text-[30px] font-medium text-myblack '>Going all-in with millennial design</h2>
                    <p className='text-[16px] font-normal text-mygray'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
                     <button className=' w-[89px] h-[36px] border-b-2 border-myblack text-[16px] font-semibold text-myblack'>Read More</button>
                </div>
            </div>
       

        </div>


        <div className='h-[1250px] md:h-[1230px] flex flex-col justify-between  md:w-[390px] '>
            <div className='h-[490px] w-full flex flex-col justify-between items-center '>
                 <div className='h-[58px] flex border-2 border-myblack rounded-md items-center justify-end px-2 w-[311px] '>
                    <Image src={'/images/filter/searchbar.png'} alt='hero' width={19} height={19} />
                 </div>
                 <div className='h-[353px] flex flex-col justify-between  w-[251px] '>
                    <h2 className='text-xl md:text-[36px] font-medium text-myblack '>Categories</h2>
                  <div className='h-[300px]  flex flex-col justify-between  w-full'>
                  <span className='flex flex-row justify-between'>
                    <p className='text-[16px] font-normal text-myblack'>Crafts</p>
                    <p className='text-[16px] font-normal text-mygray'>2</p>
                  </span>
                  <span className='flex flex-row justify-between'>
                    <p className='text-[16px] font-normal text-myblack'>Design</p>
                    <p className='text-[16px] font-normal text-mygray'>8</p>
                  </span>
                  <span className='flex flex-row justify-between'>
                    <p className='text-[16px] font-normal text-myblack'>Handmade</p>
                    <p className='text-[16px] font-normal text-mygray'>7</p>
                  </span>
                  <span className='flex flex-row justify-between'>
                    <p className='text-[16px] font-normal text-myblack'>Interior</p>
                    <p className='text-[16px] font-normal text-mygray'>1</p>
                  </span>
                 
                  <span className='flex flex-row justify-between'>
                    <p className='text-[16px] font-normal text-myblack'>Wood</p>
                    <p className='text-[16px] font-normal text-mygray'>6</p>
                  </span>
                  </div>
                 </div>
            </div>

            <div className='h-[650px] w-full flex items-center justify-center '>
            <div className='h-[618px] flex  flex-col items-center justify-between px-2 w-[252px]'>
       <h1 className='text-xl md:text-[24px] font-medium text-myblack '>Recent Posts</h1>

       <div className='h-[80px] flex flex-row justify-between w-[211px] '>
         <Image src={'/images/filter/recentpost1.png'} alt='hero' width={80} height={80} />
         <span className='h-[65px] w-[119px] flex flex-col justify-between'>
            <h1 className='text-[12px] font-normal text-myblack '>Going all-in with millennial design</h1>
            <p className='text-[12px] font-normal text-mygray '>03 Aug 2022</p>
         </span>
       </div>
       <div className='h-[80px] flex flex-row justify-between w-[211px] '>
         <Image src={'/images/filter/recentpost2.png'} alt='hero' width={80} height={80} />
         <span className='h-[65px] w-[119px] flex flex-col justify-between'>
            <h1 className='text-[12px] font-normal text-myblack '>Exploring new ways of decorating</h1>
            <p className='text-[12px] font-normal text-mygray '>03 Aug 2022</p>
         </span>
       </div>
       <div className='h-[80px] flex flex-row justify-between w-[211px] '>
         <Image src={'/images/filter/recentpost3.png'} alt='hero' width={80} height={80} />
         <span className='h-[65px] w-[119px] flex flex-col justify-between'>
            <h1 className='text-[12px] font-normal text-myblack '>Handmade pieces that took time to make</h1>
            <p className='text-[12px] font-normal text-mygray '>03 Aug 2022</p>
         </span>
       </div>
       <div className='h-[80px] flex flex-row justify-between w-[211px] '>
         <Image src={'/images/filter/recentpost4.png'} alt='hero' width={80} height={80} />
         <span className='h-[65px] w-[119px] flex flex-col justify-between'>
            <h1 className='text-[12px] font-normal text-myblack '>Modern home in Milan</h1>
            <p className='text-[12px] font-normal text-mygray '>03 Aug 2022</p>
         </span>
       </div>
       <div className='h-[80px] flex flex-row justify-between w-[211px] '>
         <Image src={'/images/filter/recentpost5.png'} alt='hero' width={80} height={80} />
         <span className='h-[65px] w-[119px] flex flex-col justify-between'>
            <h1 className='text-[12px] font-normal text-myblack '>Colorful office redesign</h1>
            <p className='text-[12px] font-normal text-mygray '>03 Aug 2022</p>
         </span>
       </div>
            </div>
            </div>

        </div>


        </div> 
        {/* pagination */}
        <div className='h-[32px] w-[90%] md:w-[392px] flex justify-between items-center '>
          <div className='h-[60px] w-[60px] text-white flex justify-center items-center bg-golden hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md'>1</div>
          <div className='h-[60px] w-[60px] text-white flex justify-center items-center bg-golden  hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md'>2</div>
          <div className='h-[60px] w-[60px] text-white flex justify-center items-center bg-golden  hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md'>3</div>
          <div className='h-[60px] w-[98px] text-white flex justify-center items-center bg-golden  hover:bg-white hover:border-2 hover:text-myblack border-golden rounded-md'>Next</div>
        </div>
      </div>

    </section>
      
    </>
  )
}

export default Blog
