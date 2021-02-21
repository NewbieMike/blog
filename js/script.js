'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

/* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    console.log('active removed');
  }

/* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

/* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.post.active');

  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    console.log('active article removed');
  }

/* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

/* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
}

//End of titleClickHandler

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optTagsListSelector = '.tags.list',
      optAuthorListSelector = '.authors .list',
      optCloudClassCount = 5,
      optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  /* [DONE] get the article id */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  console.log(optArticleSelector)
  console.log(articles);
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    console.log(articleId);

  /* [DONE] find the title element */
  /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);


    /* [DONE] create HTML of the link */
    const tagLink = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(tagLink);

    titleList.insertAdjacentHTML('beforeend', tagLink);

    //html = html + tagLink;

  /* [DONE] insert link into titleList */

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
}
//End of generateTitleLinks
generateTitleLinks();

function calculateTagsParams(tags){
  const params = {min: 10, max: 0};
  for(let tag in tags){
    console.log(tag + ' is used '+ tags[tag] + ' times!');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  console.log(params);
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min,
        normalizedMax = params.max - params.min,
        percentage = normalizedCount / normalizedMax,
        classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  console.log(classNumber);
  return classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    tagWrapper.innerHTML = '';

    console.log(tagWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'
      console.log(tagLink)
      /* add generated code to html variable */
      html = html + tagLink;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
        } else {
          allTags[tag]++;

        /* [NEW] add generated code to allTags array */
        //allTags.push(linkHTML);
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    //tagWrapper.insertAdjacentHTML('beforeend', html);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log(tagsParams);
    let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) +'" href ="#tag-' + tag + '">' + tag + '</a> (' + allTags[tag] + ') </li> ';
    console.log(tagLinkHTML);

    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
//End of generateTags
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
    console.log('Class active removed! ' + tagLink);
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allTags);
  /* START LOOP: for each found tag link */
  for (let allTag of allTags){
    /* add class active */
    allTag.classList.add('active');
    console.log('Class active added! ' + allTag);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */
    for (let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log(authorWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);
    /* generate HTML of the link */
    const htmlAuthor = '<a href="#author-' + articleAuthor + '">'+ articleAuthor +'</a>';
    //console.log(htmlAuthor);
    /* insert HTML of all the links into the authors wrapper */
    authorWrapper.insertAdjacentHTML('afterend', htmlAuthor);
    /* add generated code to html variable */
    html = html + authorWrapper;

  /* END LOOP: for every article: */
  }
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement =  this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "autor" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks){
    /* remove class active */
    authorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
}
  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthors = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (let allAuthor of allAuthors){
    /* add class active */
    allAuthor.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  /* START LOOP: for each link */
    for (let authorLink of authorLinks){
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
