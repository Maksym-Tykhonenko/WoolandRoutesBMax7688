import locplac from '../roudata/locplac';

export const categories = locplac as any[];

export const allPlaces = categories.flatMap(category =>
  category.places.map((place: any) => ({
    ...place,
    categoryId: category.id,
    categoryName: category.name,
  })),
);

export const mapInitialRegion = {
  latitude: 50.5,
  latitudeDelta: 6.7,
  longitude: -123.3,
  longitudeDelta: 6.1,
};
