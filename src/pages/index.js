import React from "react";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import MoreStories from "../components/more-stories";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";

export default function Index({ data: { allPosts, allCursos, allSkills, site, blog } }) {
  const heroPost = allPosts.nodes[0];
  const morePosts = allPosts.nodes.slice(1);
  const meusCursos = allCursos.nodes;
  const minhasSkills = allSkills.nodes;
  console.log(meusCursos)  
  console.log(minhasSkills)

  return (
    <Container>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} />
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Container>
  );
}

export const query = graphql`
  {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    blog: datoCmsBlog {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    
    allSkills: allDatoCmsSkill {
      nodes {
        skillsvalor
        skillsnome
        skillsicone {
          url
        }
      }
    }

    allCursos: allDatoCmsCurso {
      nodes {
        titulo
        instituicao
        periodo(fromNow: true)
      }
    }
    allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
          large: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 1500px) 100vw, 1500px") {
            ...GatsbyDatoCmsFluid
          }
          small: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 760px) 100vw, (max-width: 1500px) 50vw, 700px") {
            ...GatsbyDatoCmsFluid
          }
        }
        author {
          name
          picture {
            fixed(
              width: 48
              height: 48
              imgixParams: { fm: "jpg", fit: "crop", sat: -100 }
            ) {
              ...GatsbyDatoCmsFixed
            }
          }
        }
      }
    }
  }
`;
