import student
import course

class School:
    def __init__(self, name):
        self.name = name
        self.courses = []
        self.students = []

    def add_course(self, course: Course):
        self.course.append(course)

    def add_student(self, student: Student):
        self.students.append(student)

    def add_student_grade(self, student: Student, course: Course, grade: int):
        student.add_student_grade(self, course.name, grade)

    def get_students(self):
        return self.students

    def get_courses(self):
        return self.courses

    def get_students_ordered_by_average_grade(self):
        pass