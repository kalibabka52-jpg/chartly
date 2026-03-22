import { groq } from 'next-sanity'

export const allCoursesQuery = groq`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    overview,
    category,
    difficulty,
    xpTotal,
    coverImage,
    "lessonCount": count(*[_type == "lesson" && references(^._id)]),
    instructor->{ name, avatar, bio }
  }
`

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    category,
    difficulty,
    xpTotal,
    coverImage,
    prerequisiteQuestId,
    instructor->{ name, avatar, bio },
    "lessons": *[_type == "lesson" && references(^._id)] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      order,
      xp,
      duration,
      videoUrl
    },
    "lessonCount": count(*[_type == "lesson" && references(^._id)])
  }
`

export const lessonBySlugQuery = groq`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    order,
    xp,
    duration,
    videoUrl,
    content,
    course->{
      _id,
      title,
      "slug": slug.current,
      "lessons": *[_type == "lesson" && references(^._id)] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        order,
        xp,
        duration
      }
    }
  }
`

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    coverImage,
    author,
    readTime,
    publishedAt
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    coverImage,
    author,
    readTime,
    publishedAt,
    body,
    relatedCourse->{ title, "slug": slug.current, category, xpTotal }
  }
`
