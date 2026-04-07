class Student:
    """Klass hoiab ühe õpilase infot."""

    """Loo järgmised meetodid:"""

    def __init__(self, name: str):
        """- konstruktor, kuhu saab kaasa anda õpilase nime. Siin on vaja luua muutuja(d) õpilase hinnete hoidmiseks. Lisaks tuleb luua muutuja õpilase id jaoks, mille väärtust alguses peab olema None."""
        self.name = name
        self.id = 0
        self.grade = []

    def set_id(self, id: int):
        """- õpilasele määratakse unikaalne identifikaator. Kui identifikaator on juba määratud, siis teist korda seda üle kirjutada ei saa (sellisel juhul lihtsalt ignoreeritakse uue väärtuse lisamist)"""
        self.id = id

    def get_id(self):
        """ -> int - tagastab õpilase identifikaatori"""
        return self.id

    def get_grades(self):
        """ -> list[tuple[Course, int]] - tagastab järjendi õpilase tulemustest. Iga element on ennik (tuple),
        mille esimene element on kursuse objekt ja teine element on hinne sellel kursusel. 
        Hindeid pannakse School klassis oleva meetodiga add_student_grade(). Mõistlik on õpilase klassi lisada mingi abistav meetod, millega hinnet lisada."""
        return self.grade
    
    def add_student_grade(self, course_name, course_grade):
        self.grade.append(tuple(course_name, course_grade))

    def get_average_grade(self):
        """- tagastab õpilase keskmise hinde. Kui õpilasel hindeid pole, tagastab meetod -1."""
        self.average = 0
        
        for i in range(len(self.grade)):
            self.average += self.grade[i[1]]
        if self.average == 0: 
            return self.average
        else:
            return -1

    def __repr__(self):
        """ -> str - tagastab objekti sõnekuju. Siin klassis tagastab õpilase nime."""
        return self.name