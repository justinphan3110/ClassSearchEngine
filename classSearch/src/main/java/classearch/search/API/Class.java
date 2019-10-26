package classearch.search.API;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

public class Class implements Comparable<Class>{
    private final String SUBJECT;
    private final String ID;
    private final String TITLE;
    private final String DESCRIPTION;
    private final String CREDIT;
    private final List<String> semester;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Class aClass = (Class) o;
        return SUBJECT.equals(aClass.SUBJECT) &&
                ID.equals(aClass.ID) &&
                TITLE.equals(aClass.TITLE) &&
                DESCRIPTION.equals(aClass.DESCRIPTION) &&
                CREDIT.equals(aClass.CREDIT);
    }

    public List<String> getSemester() {
        return semester;
    }

    private Class(String subject, String id, String title, String description, String unit, List<String> semester){
        this.SUBJECT = subject;
        this.ID = id;
        this.TITLE = title;
        this.DESCRIPTION = description;
        this.CREDIT = unit;
        this.semester = semester;
    }

    @Override
    public String toString() {
        return "Class{" +
                "SUBJECT='" + SUBJECT + '\'' +
                ", ID='" + ID + '\'' +
                ", TITLE='" + TITLE + '\'' +
                ", DESCRIPTION='" + DESCRIPTION + '\'' +
                ", CREDIT='" + CREDIT + '\'' +
                ", semester=" + semester +
                '}';
    }


    public static final Class of(String code, String id, String title, String description, String unit, List<String> semester){
        Objects.requireNonNull(description, "description can not be null");
        Objects.requireNonNull(title, "title can not be null");
        Objects.requireNonNull(semester, "semester can not be null");

        return new Class(code, id, title, description, unit, semester);
    }

    @Override
    public int hashCode() {
        return Objects.hash(SUBJECT, ID, TITLE, DESCRIPTION, CREDIT);
    }

    public String getSUBJECT() {
        return SUBJECT;
    }

    public String getID() {
        return ID;
    }

    public String getTITLE() {
        return TITLE;
    }

    public String getCREDIT() { return CREDIT;}

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    @Override
    public int compareTo(Class c) {
        return Comparator.comparing(Class::getSUBJECT)
                        .thenComparing(Class::getID)
                        .thenComparing(Class::getTITLE)
                        .compare(this, c);
                         
    }
}
