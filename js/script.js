{
  'use strict';  

  /*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
 });
*/

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;    
    console.log('clickedElement (with plus): ' + clickedElement);
    console.log(event);
    console.log('Link was clicked');
  

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');


    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .post.active');

    for (let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);


    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');  

  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML='';

    

    /* [DONE] for each article */

    const allArticles = document.querySelectorAll(optArticleSelector + customSelector);
    
    

    let html = '';  

    for(let eachArticle of allArticles){

      /* [DONE] get the article id */

      const articleId = eachArticle.getAttribute('id');
      console.log(articleId);
  
      /* [DONE] find the title element */
    
      const articleTitle = eachArticle.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
 
      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
    
  
      /* [DONE] insert link into titleList */

      html = html + linkHTML;

      console.log(html);
    }

    titleList.innerHTML = html;

  }
  
  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  addClickListenersToTags();
  


  function generateTags() {
  /* find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article */
    for (let eachArticle of allArticles) {
    /* find tags wrapper */
      const articleTagsWrapper = eachArticle.querySelector('.post-tags');
    
      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = eachArticle.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
      /* generate HTML of the link */
        const tagLinkHTML = '<li><a href="#tag-' + tag + ' ">' + tag + '</a></li> ';

        /* add generated code to html variable */
        html += tagLinkHTML;
      }
      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      const tagsListHTML = '<div class="post-tags"><p><strong>Tags:</strong></p><ul class="list list-horizontal">' + html + '</ul></div>';
      console.log(tagsListHTML);
      articleTagsWrapper.innerHTML = tagsListHTML;
    }
  /* END LOOP: for every article */
  }

  generateTags();
  

  



  function tagClickHandler(event){
    
    /* prevent default action for this event */
    event.preventDefault();
    console.log(event);
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    console.log(tag);
    
    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(tagsActive);
    /* START LOOP: for each active tag link */
    for (let tagActive of tagsActive){
    /* remove class active */
      tagActive.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagsLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let eachTagLink of allTagsLinks){
    /* add class active */
      eachTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }
  

  function addClickListenersToTags(){
    
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    
    /* START LOOP: for each link */
    for(let eachLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
      eachLink.addEventListener('click', tagClickHandler);
     
      
    }
    /* END LOOP: for each link */
  }


  addClickListenersToTags();
 
 
}