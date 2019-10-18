package classearch.search.API;
import java.util.Objects;

public class Class {
    private final String SUBJECT;
    private final String ID;
    private final String TITLE;
    private final String DESCRIPTION;
    private final String CREDIT;


    public String getSUBJECT() {
        return SUBJECT;
    }

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

    private Class(String subject, String id, String title, String description, String unit){
        this.SUBJECT = subject;
        this.ID = id;
        this.TITLE = title;
        this.DESCRIPTION = description;
        this.CREDIT = unit;
    }

    @Override
    public String toString() {
        return "Class{" +
                "SUBJECT='" + SUBJECT + '\'' +
                ", ID='" + ID + '\'' +
                ", TITLE='" + TITLE + '\'' +
                ", DESCRIPTION='" + DESCRIPTION + '\'' +
                ", UNIT='" + CREDIT + '\'' +
                '}';
    }


    public static final Class of(String code, String id, String title, String description, String unit){
        Objects.requireNonNull(description, "description can not be null");
        Objects.requireNonNull(title, "title can not be null");
//        Objects.requireNonNull(meetingMap, "meetingMap can not be null");

        return new Class(code, id, title, description, unit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(SUBJECT, ID, TITLE, DESCRIPTION, CREDIT);
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
}
