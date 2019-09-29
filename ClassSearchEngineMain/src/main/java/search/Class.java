package search;
import java.util.Objects;

public class Class {
    private final String CODE;
    private final String ID;
    private final String NAME;
    private final String DESCRIPTION;
    private final String UNIT;

    public String getCODE() {
        return CODE;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Class aClass = (Class) o;
        return CODE.equals(aClass.CODE) &&
                ID.equals(aClass.ID) &&
                NAME.equals(aClass.NAME) &&
                DESCRIPTION.equals(aClass.DESCRIPTION) &&
                UNIT.equals(aClass.UNIT);
    }

    @Override
    public int hashCode() {
        return Objects.hash(CODE, ID, NAME, DESCRIPTION, UNIT);
    }

    public String getID() {
        return ID;
    }

    public String getNAME() {
        return NAME;
    }

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    private Class(String code, String id, String name, String description, String unit){
        this.CODE = code;
        this.ID = id;
        this.NAME = name;
        this.DESCRIPTION = description;
        this.UNIT = unit;
    }

    @Override
    public String toString() {
        return "Class{" +
                "CODE=" + CODE +
                ", ID=" + ID +
                ", NAME='" + NAME + '\'' +
                ", DESCRIPTION='" + DESCRIPTION + '\'' +
                '}';
    }

    public static final Class of(String code, String id, String name, String description, String unit){
        Objects.requireNonNull(description, "description can not be null");
        Objects.requireNonNull(name, "name can not be null");

        return new Class(code, id, name, description, unit);
    }






}
