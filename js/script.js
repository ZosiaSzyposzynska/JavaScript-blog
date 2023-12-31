{
  'use strict';  

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
  };


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
    optAuthorListSelector = '.authors.list';

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

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
    
  
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
        const tagHTMLData = { tag: tag };
        const tagLinkHTML = templates.tagLink(tagHTMLData);

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
    let allTagsData = { tags: [] };

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagData = {
        tag: tag,
        count: allTags[tag],
        className: calculateTagsClass(allTags[tag], tagsParams)
      };
      allTagsData.tags.push(tagData); 
      
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
 


  function generateAuthors() {
    /* create a new variable allAuthors with an empty object */
    let allAuthors = {};
    let allAuthorsHTML = '';
    /* find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);
    /* STARTS LOOP: for every article */
    for (let eachArticle of allArticles) {
      /* find article author */
      const articleAuthorWrapper = eachArticle.querySelector('.post-author');
      /* make html variable with empty string */
      let html = '';
      /* get author from data-author attribute */
      const articleAuthor = eachArticle.getAttribute('data-author');
      /* generate html of the link */
      const authorHTMLData = { author: articleAuthor };
      const authorLinkHTML = templates.authorLink(authorHTMLData);
      /* add code to html variable */
      html += authorLinkHTML;
      /* insert HTML of the link into the author wrapper */
      articleAuthorWrapper.innerHTML = html;
      /* check if this author is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* add the author to allAuthors object with initial value of 1 */
        allAuthors[articleAuthor] = 1;
      } else {
        /* increment the article count for the existing author */
        allAuthors[articleAuthor]++;
      }
    }
    /* find the list of authors in the right column */
    const authorList = document.querySelector(optAuthorListSelector);
    /*  START LOOP: for each author in allAuthors */
    for (let author in allAuthors) {
      const articleCount = getAuthorArticleCount(author);
      const authorLinkHTML = templates.authorListLink({ author: author, count: articleCount });
      allAuthorsHTML += authorLinkHTML;
    /* END LOOP: for each author in allAuthors */
    }
    /* add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = allAuthorsHTML;
  

    addClickListenersToAuthors();


    function addClickListenersToAuthors() {
      /* find all author links */
      const authorLinks = document.querySelectorAll('a[href^="#author-"]');
      /* START LOOP: for each author link */
      for (let authorLink of authorLinks) {
        /* add authorClickHandler as the event listener for that link */
        authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each author link */
      }
    }
  }

  function getAuthorArticleCount(author) {
    /* find all articles with the specified author */
    const articlesByAuthor = document.querySelectorAll('[data-author="' + author + '"]');
    /* return the number of articles */
    return articlesByAuthor.length;
  }


  function authorClickHandler(event) {
    /* prevent default action */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all authors links with class active */
    const authorActive = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active author link */
    for (let activeAuthorLink of authorActive) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');
      /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for (let eachAuthorLink of allAuthorLinks) {
      eachAuthorLink.classList.add('active');
      /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  generateAuthors();

}