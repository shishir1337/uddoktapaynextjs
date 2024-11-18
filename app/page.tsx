import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const courses = [
  { id: 1, title: 'Introduction to React', price: 80, description: 'Learn the basics of React and build your first app.' },
  { id: 2, title: 'Advanced JavaScript', price: 120, description: 'Dive deep into JavaScript concepts and become a pro.' },
  { id: 3, title: 'Node.js Fundamentals', price: 100, description: 'Master server-side JavaScript with Node.js.' },
  { id: 4, title: 'Python for Beginners', price: 90, description: 'Get started with Python programming and build basic projects.' },
  { id: 5, title: 'HTML & CSS Essentials', price: 70, description: 'Learn the foundational skills for web development with HTML and CSS.' },
  { id: 6, title: 'Machine Learning Basics', price: 150, description: 'Explore the basics of machine learning and start building AI models.' },
  { id: 7, title: 'React Native Development', price: 130, description: 'Build cross-platform mobile apps with React Native.' },
  { id: 8, title: 'Django for Web Development', price: 110, description: 'Learn how to build scalable web applications using Django.' },
  { id: 9, title: 'Data Structures and Algorithms', price: 95, description: 'Strengthen your problem-solving skills by learning key data structures and algorithms.' },
  { id: 10, title: 'Vue.js Fundamentals', price: 85, description: 'Learn the core concepts of Vue.js for building reactive user interfaces.' },
  { id: 11, title: 'Full-Stack Web Development', price: 200, description: 'Master both frontend and backend technologies to build full-stack web applications.' },
  { id: 12, title: 'Git & GitHub for Beginners', price: 60, description: 'Learn version control with Git and collaborate on projects using GitHub.' },
  { id: 13, title: 'Blockchain Development', price: 170, description: 'Understand the principles of blockchain technology and build your own blockchain.' },
  { id: 14, title: 'Responsive Web Design', price: 75, description: 'Learn how to design websites that look great on all screen sizes.' },
  { id: 15, title: 'Java for Web Development', price: 130, description: 'Build secure and scalable web applications using Java.' },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">£{course.price}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/course/${course.id}`} passHref>
                <Button className="w-full">View Course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}