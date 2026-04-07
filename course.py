class Course:
    """See klass hoiab infot ühe õppeaine kohta.
    Loo järgmised meetodid:"""

    def __init__(self, name: str):
        """- konstruktor, kuhu saab kaasa anda kursuse nime. Arvatavasti on vaja siin konstruktoris luua info ka selle jaoks, et hoida õpilaste hindeid."""
        self.name = name
        self.students = []
        self.grades = []
        
    def get_grades(self): 
        """-> list[tuple[Student, int]] - meetod tagastab järjendi õpilaste tulemustest. Järjendi iga element on ennik (tuple), 
        kus esimene element on õpilase objekt ja teine on tema hinne. 
        Hindeid pannakse School klassis oleva meetodiga add_student_grade(). Mõistlik on kursuse klassi lisada mingi abistav meetod, millega hinnet lisada."""
        pass 
    
    def get_average_grade(self):
       """ -> float - tagastab kursuse keskmise hinde. Ehk siis keskmine kõikidest sellele kursusel antud hinnetest. 
        Kui hindeid pole, siis tagastab meetod -1."""
       return 
    
    def __repr__(self): 
       """- tagastab "ilusa" sõne kuju antud objektist, ehk tagastab kursuse nime.
        Kuigi __str__ meetodi realiseerimine annaks suuresti sama tulemuse, siis __repr__ eelis on see, 
        et ka listi ja enniku jm andmestruktuuri sees näidatakse objekti vastavalt määratud sõne kujul."""
       return self.name