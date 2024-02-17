const handleCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();

  const tabContainer = document.getElementById('tab_container');
  const trimData = data.data.slice(0, 4);

  trimData.forEach((category) => {
    const div = document.createElement('div');
    let textColor = '';
    
    if (category.category_id === '1000') {
      textColor = 'text-red-600'; // Set background color for category_id '1000'
    }

    div.innerHTML = `
      <a class="${textColor}" onclick="handleVideos('${category.category_id}')">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });
};

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedTime = `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' +'ago' : ''}`;

  return formattedTime;
}


// Indivisul click---------------------
const handleVideos = async (categoryId) =>{
    const response = await fetch (`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML = '';

    if(data.data.length === 0){
  // Create and display an error message
  const errorMessage = document.createElement('div');
  errorMessage.innerHTML = `
  <div class="text-center w-[100%] lg:w-[1300px] mx-auto mt-14">
  <div class="flex justify-center items-center">
    <img class="text-center align-middle" src="images/Icon.png" alt="">
    </div>
    
    <div class="flex justify-center items-center mt-5 text-xl">
      <p>Oops!! Sorry, There is no <br> content here</p>
    </div>
</div>

 `;

  cardContainer.appendChild(errorMessage);
    }
    else{
      data.data.forEach((videos)=>{
        console.log(videos)
          const div = document.createElement('div');
          div.innerHTML= `
          <div class="card bg-base-100 shadow-xl h-[350px]">
          <figure class="relative w-full h-[250px]"><img class="h-[250px] w-[100%]" src=${videos.thumbnail} alt="Shoes"/>
          <p class="absolute bottom-0 right-0 bg-black text-white">${formatTime(videos?.others?.posted_date? videos?.others?.posted_date : '')}</p>
           </figure>
     
           <div class="card-body">
             <div class="flex gap-4 justify-start items-center">
                 <img class="h-12 w-12 rounded-full" src=${videos?.authors[0]?.profile_picture} alt="no img">
                 <div>
                  <h3 class="font-bold">${videos?.title}</h3>
                 </div>
             </div>
           
            <div class="ml-[65px] flex items-center gap-2">
              <h4 class="font-bold">${videos?.authors[0]?. profile_name}</h4>
              <h4> ${videos.authors[0].verified? '<img src="images/verification.png" alt="">':''} </h4>
              
            </div>
             <p class="ml-[65px] font-bold">${videos?.others.views} views</p>
           </div>
         </div>
           `;
           cardContainer.appendChild(div);
      })
  
  };
    }

const sortVideosByViewsDescending =async (categoryId) =>{
  const response = await fetch (`https://openapi.programming-hero.com/api/videos/category/1000`)
  const data = await response.json();
  console.log(data.data);
  data.data.forEach((sort)=>{
    console.log(sort);
  })
}



handleVideos('1000')
handleCategory();





