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
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author .list',  
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorListSelector = '.authors';

  function generateTitleLinks(customSelector = '', author = ''){

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
  


  function calculateTagsParams(tags){
    /* define constant params */
    const params = {
      max: 0,
      min: 999999
    };
    /* START LOOP */
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      /* Max and min value of params */
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
      /* END LOOP */
    }
    return params;
  }



  function calculateTagsClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) +1);

    return optCloudClassPrefix + classNumber;
  }


  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {}; 

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
        const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html += tagLinkHTML;
      
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){
        /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      const tagsListHTML = '<div class="post-tags"><p><strong>Tags:</strong></p><ul class="list list-horizontal">' + html + '</ul></div>';
      console.log(tagsListHTML);
      articleTagsWrapper.innerHTML = tagsListHTML;
    
      /* END LOOP: for every article */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagsClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);  
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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
 


  function generateAuthors(){
    /* create a new variable allAuthors with an empty object */
    let allAuthors = {};
    let allAuthorsHTML = '';

    /* find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);
    
    /* STARTS LOOP: for every article */
    for(let eachArticle of allArticles){
      /* find article author */
      const articleAuthorWrapper = eachArticle.querySelector('.post-author');
      /* make html variable with empty string */
      let html = '';
      /* get author from data-author attribute */
      const articleAuthor = eachArticle.getAttribute('data-author');
      console.log(articleAuthor);
      /* generate html of the link */
      const authorLinkHtml = '<li><a href="#author-' + articleAuthor + ' ">' + articleAuthor + '</a></li>';
      /* add code to html variable */
      html += authorLinkHtml;
      /* insert HTML of the link into the author wrapper */
      articleAuthorWrapper.innerHTML = html;
      /* [NEW] check if this author is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
      /* [NEW] add the author to allAuthors object with initial value of 1 */
        allAuthors[articleAuthor] = 1;
      } else {
      /* [NEW] increment the article count for the existing author */
        allAuthors[articleAuthor]++;
      }
  
      /* [NEW] find the list of authors in the right column */
      const authorList = document.querySelector(optAuthorListSelector);
      console.log(authorList);

      /* [NEW] create variable for all links HTML code */
      
    }
    /* [NEW] START LOOP: for each author in allAuthors */
    for (let author in allAuthors) {
      const articleCount = getAuthorArticleCount(author);
      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a> (' + articleCount + ')</li>';
      allAuthorsHTML += authorLinkHTML;
      console.log(allAuthorsHTML);
        
    }

    /* [NEW] END LOOP: for each author in allAuthors */

    /* [NEW] add HTML from allAuthorsHTML to authorList */
     
   
    
  }

  function getAuthorArticleCount(author) {
  /* find all articles with the specified author */
    const articlesByAuthor = document.querySelectorAll('[data-author="' + author + '"]');

    /* return the number of articles */
    return articlesByAuthor;
  }





  function addClickListenersToAuthors() {
  /* find all author links */
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector);

    /* START LOOP: for each author link */
    for (let authorLink of authorLinks) {
    /* add authorClickHandler as the event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      console.log(authorLink);
    }
  /* END LOOP: for each author link */
  }


  function authorClickHandler(event){
    /* prevent default action */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-','');
    console.log(author);
    /* find all authors links with class active */
    const authorActive = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(authorActive);
    /* START LOOP: for each active author link */
    for (let activeAuthorLink of authorActive){
    /* remove class active */
      activeAuthorLink.classList.remove('active');
      /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for (let eachAuthorLink of allAuthorLinks){
    /* add class active */
      eachAuthorLink.classList.add('active');
      console.log(eachAuthorLink);
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    
    generateTitleLinks('[data-author="' + author + '"]');

  }

  
  generateAuthors();
  addClickListenersToAuthors();
  

}











 

