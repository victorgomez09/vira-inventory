from rest_framework import serializers
from api.models import Product
from api.serializers.category import CategorySerializer

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Product._meta.get_field('category').related_model.objects.all(),
        source='category',
        write_only=True
    )
    class Meta:
        model = Product
        fields = '__all__'
        extra_fields = ['category_id']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Optionally remove category_id from output
        rep.pop('category_id', None)
        return rep
        